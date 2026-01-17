import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import MinimalTemplate from './templates/MinimalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;


            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />
        }
    }

    return (
        <div className='w-full bg-gray-100'>
            <div id='resume-preview' className={`border border-gray-200 shadow-none print:border-none ${classes}`}>
                {renderTemplate()}
            </div>
            <style>
                {`
            @page {
            size: letter;
            margin: 0;
            }

            @media print {
                html,body {
                    width: 8.5in;
                    height: 11in;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }

                body * {
                    visibility: hidden;
                }

                #resume-preview,
                #resume-preview * {
                    visibility: visible;
                }

                #resume-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 8.5in;
                    min-height: 11in;
                    margin: 0;
                    padding: 0;
                    box-shadow: none !important;
                    border: none !important;
                }
            }

            `}
            </style>
        </div>
    )
}

export default ResumePreview