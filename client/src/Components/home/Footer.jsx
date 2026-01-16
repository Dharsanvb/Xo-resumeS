import React from 'react'

const Footer = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <footer className="mt-20 flex flex-col items-center justify-around w-full py-16 text-sm bg-slate-50 text-gray-800 bg-gradient-to-r from-white via-green-200 to-white">
                <img src="Xo.png" alt="XO" className='h-15 auto'/>
                <p className="mt-4 text-center">Copyright © 2026 <a href="https://prebuiltui.com">The Xo Resume Builder</a>. All rights reservered.</p>
                <div className="flex items-center gap-4 mt-6">
                    <a href="#" className="font-medium text-gray-800 hover:text-black transition-all">
                       Xo
                    </a>
                    <div className="h-4 w-px bg-black/20"></div>
                    <a href="#" className="font-medium text-gray-800 hover:text-black transition-all">
                        Dharsan
                    </a>
                </div>
            </footer>

            
        </>
    )
}

export default Footer