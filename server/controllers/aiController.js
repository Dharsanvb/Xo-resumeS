import { response } from "express";
import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// Controller for enhancing a resume's professional summary
// POST : /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;


        if (!userContent) {
            return res.status(400).json({ message: "Missing require fields" })
        }

        const response = await ai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
// export const enhanceProfessionalSummary = async (req, res) => {
//     try {
//         const { userContent } = req.body;

//         if (!userContent || typeof userContent !== "string") {
//             return res.status(400).json({ message: "userContent is required" });
//         }

//         if (userContent.length > 600) {
//             return res.status(400).json({
//                 message: "Summary too long. Please limit to 4 lines.",
//             });
//         }


//         // Model priority list (best → fallback)
//         const models = [
//             "gemini-1.5-flash",
//             "gemini-1.5-pro",
//             "gemini-2.5-flash",
//         ];

//         let enhancedContent = null;
//         let usedModel = null;

//         for (const model of models) {
//             try {
//                 const response = await ai.chat.completions.create({
//                     model,
//                     temperature: 0.4,
//                     max_tokens: 120,
//                     messages: [
//                         {
//                             role: "system",
//                             content:
//                                 "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly, and only return text no options or anything else."
//                         },
//                         {
//                             role: "user",
//                             content: userContent
//                         }
//                     ],
//                 });

//                 enhancedContent = response.choices?.[0]?.message?.content;
//                 usedModel = model;

//                 if (enhancedContent) break; // success → stop switching
//             } catch (modelError) {
//                 console.error(`Model failed: ${model}`, modelError.message);
//             }
//         }

//         if (!enhancedContent) {
//             return res.status(500).json({
//                 message: "Failed to enhance summary. Please try again later.",
//             });
//         }

//         return res.status(200).json({
//             enhancedContent,
//             modelUsed: usedModel,
//         });

//     } catch (error) {
//         console.error("Enhance summary error:", error);
//         return res.status(500).json({ message: "Internal server error", });
//     }
// };


// Controller for enhancing a resume's Job description
// POST : /api/ai/enhance-job-des
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing require fields" })
        }

        const response = await ai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// controller for uploading a resume to the database
// POST : /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {

        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing require fields" })
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume."

        const userPrompt = `extract data from this resume ${resumeText}  
        Provide data in the following JSON format with no additional text before or after: 
        
        {
                professional_summary:{type:String, default:""},
                    skills:[{type:String}],
                    personal_info:{
                        image:{type:String, default:""},
                        full_name:{type:String, default:""},
                        profession:{type:String, default:""},
                        email:{type:String, default:""},
                        phone:{type:String, default:""},
                        location:{type:String, default:""},
                        linkedin:{type:String, default:""},
                        website:{type:String, default:""},
                    },
                experience :[
                        {
                            company : {type:String},
                            position : {type:String},
                            start_date : {type:String},
                            end_date : {type:String},
                            description : {type:String},
                            is_current : {type:Boolean},
                        }
                ],
                project : [
                    {
                        name: {type:String},
                        type: {type:String},
                        description : {type:String},
                    }
                ],
                education :[
                        {
                            institution : {type:String},
                            degree : {type:String},
                            field : {type:String},
                            graduation_date : {type:String},
                            gpa : {type:String},
                        
                        }
                ], 
        }
               
        `

        const response = await ai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],

            response_format: { type: 'json_object' }
        });
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({ userId, title, ...parsedData })
        return res.json({ resumeId: newResume._id })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}