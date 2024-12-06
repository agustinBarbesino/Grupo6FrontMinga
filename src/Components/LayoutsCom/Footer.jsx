import './footer.css'
import React from "react"
import { NavLink } from "react-router-dom"
import { FaFacebookSquare, FaTwitter, FaVimeoV, FaYoutube } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import img from "../../assets/logoMinga.png"

const Footer = () => {

    return (
        <>
            <div className=' md:block md:min-h-[40vh]'>

                <div className='relative w-full lg:min-h-[55vh] min-h-[20vh] overflow-hidden bg-gradient-to-r from-orange-800 via-sky-900 via-40% to-red-900 to-100% bg-contain bg-bottom clip-ellipse-bg '>
                    <img src="https://s3-alpha-sig.figma.com/img/fcce/6712/353a5270e91eeb0d409a11fa6f598267?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IwS5A6iz-YJmkm7H1o8Xxl8AWB5CCGojk2a1w6D6obNW4z5Y71XKDBo~o6rI8y9jZBtxYVKVGQlkxAh842gqwEL~00d1QSo5mH9uI87IWaxQIIEdVjWd2-zyoNVzKBThlmG~OR3Sj-v9xUM17a2DLbiLktMORW4x3S1FAwdEcUjePpb4rbyevYrzWRy3EnalgW5hBq4vrRuIW4gDC34q2n4jKVjpjTlYz2NMgjvjHh0XvFzZQUluykS2e6PRWA1FdClvfWHOJQ9IPn-LStxUddI29glRnHmAHBS~4NYUXYDsp3W-PyaM-M~JeDGpLUeT~rcl1sfBDPvdm5rJXlXF~Q__" alt="recorte"
                        className="absolute w-full h-full  lg:h-full object-cover clip-ellipse-custom" />
                </div>
                <div className="flex items-center min-h-[10vh] font-montserrat pb-1">
                    <div className=" flex flex-row w-1/3 justify-center items-center" >
                        <div className="flex align-center md:ml-6 mb-2">
                            <NavLink to="/Home" className={({ isActive }) => isActive ? "place-content-center pl-2 md:px-6 underline" : "place-content-center pl-2 md:px-6 drop-shadow"}>Home</NavLink>
                            <NavLink to="/mangas" className={({ isActive }) => isActive ? "place-content-center pl-2 md:px-6 underline" : "place-content-center pl-2 md:px-6 drop-shadow"}>Mangas</NavLink>

                        </div>


                    </div>

                    <div className="flex w-1/3 md:w-1/3 justify-center items-center">
                        <NavLink to="/Home" className="w-full flex justify-center items-center self-center"> <img src={img} className="h-auto w-10 md:w-16" alt="LogoMinga" />
                        </NavLink>
                    </div>
                    <div className="flex flex-col w-1/3 items-end justify-end pr-2 md:mr-10 font-montserrat">
                        <div className='flex flex-col md:w-1/2 justify-end'>

                            <div className="flex flex-row justify-between w-full px-1 pb-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookSquare className="text-black hover:text-rose-dark" size={24} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="text-black hover:text-rose-dark" size={24} />
                                </a>
                                <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer">
                                    <FaVimeoV className="text-black hover:text-rose-dark" size={24} />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube className="text-black hover:text-rose-dark" size={24} />

                                </a>
                            </div>
                            <div className="flex flex-col text-center ">
                                <button type="button" className="flex flex-row justify-center items-center text-white font-light bg-rose-dark hover:bg-rose-light  rounded-sm text-sm px-5 py-2.5 text-center mb-2">Donate <CiHeart className="text-white hover:text-rose-dark md:ml-2" size={24} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Footer