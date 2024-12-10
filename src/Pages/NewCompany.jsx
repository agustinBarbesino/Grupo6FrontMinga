import CreateCompany from '../Components/Edit/CreateCompany'
import newImg from '../assets/newImg.png'
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../store/actions/darkModeActions';

export default function NewCompany() {
    const isDarkMode = useSelector(selectIsDarkMode);

    return (
        <>
            <div className={`w-full min-h-screen flex ${isDarkMode ? 'bg-dark-bg-primary' : 'bg-white'}`}>
                <div className="w-full md:w-1/2 hidden md:flex">
                    <img
                        className="w-full h-full object-cover"
                        src="src/assets/rolBg.png"
                        alt="Background"
                    />
                </div>
                <div className={`flex flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat 
                    ${isDarkMode ? 'bg-dark-bg-primary' : 'bg-white'}`}>
                    <h1 className={`text-2xl mt-16 ${isDarkMode ? 'text-dark-text-primary' : ''}`}>
                        New Company
                    </h1>
                    <img 
                        src={newImg} 
                        alt="new" 
                        className="rounded-full h-20 m-12" 
                    />
                    
                    <style>
                        {`
                            ${isDarkMode ? `
                                input,
                                textarea,
                                select {
                                    background-color: #2d2d2d !important;
                                    border-color: #404040 !important;
                                    color: #e0e0e0 !important;
                                }
                                
                                input::placeholder,
                                textarea::placeholder {
                                    color: #9ca3af !important;
                                }

                                input:focus,
                                textarea:focus,
                                select:focus {
                                    border-color: #be185d !important;
                                }

                                label {
                                    color: #e0e0e0 !important;
                                    background-color: #1a1a1a !important;
                                }
                            ` : ''}
                        `}
                    </style>
                    
                    <CreateCompany/>
                </div>
            </div>
        </>
    )
}