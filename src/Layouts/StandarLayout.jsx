import { Outlet } from 'react-router-dom';
import Header from '../Components/LayoutsCom/Header.jsx';
import Footer from '../Components/LayoutsCom/Footer.jsx';

export default function StandarLayout() {
  return (
    <>
      <div className="flex flex-col  min-h-screen ">
        <Header />
        <main className=' flex-grow min-h-80'>
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>

    </>
  );
}