import { Outlet } from 'react-router-dom';
import Header from '../Components/LayoutsCom/Header.jsx';
import Footer from '../Components/LayoutsCom/Footer.jsx';
import Shimeji from '../Components/Shimeji/Shimeji.jsx';
export default function StandarLayout() {
  return (
    <>
      <div className="flex flex-col  min-h-screen relative">
        <Header />
        <Shimeji></Shimeji>
        <main className=' flex-grow min-h-80 z-10'>
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>

    </>
  );
}