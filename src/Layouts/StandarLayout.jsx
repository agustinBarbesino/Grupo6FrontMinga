import { Outlet } from 'react-router-dom';
import NavBar from '../Components/LayoutsCom/Navbar.jsx';
import Footer from '../Components/LayoutsCom/Footer.jsx';

export default function StandarLayout() {
  return (
    <>
      <div className="flex flex-col  min-h-screen ">
        <NavBar />
        <main className=' flex-grow min-h-80'>
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>

    </>
  );
}