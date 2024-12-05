import CreateCompany from '../Components/Edit/CreateCompany'
import newImg from '../assets/newImg.png'

export default function NewCompany() {
    return (
        <>
            <div className="w-full min-h-screen flex">
                <div className="w-full md:w-1/2 hidden md:flex">
                    <img
                        className="w-full h-full object-cover"
                        src="src/assets/rolBg.png"
                        alt="Background"
                    />
                </div>
                <div className="flex flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className="text-2xl mt-16">New Company</h1>
                    <img src={newImg} alt="new" className="rounded-full h-20 m-12" />
                    <CreateCompany/>
                </div>
            </div>
        </>
    )
}