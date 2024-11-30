import { Outlet } from 'react-router-dom';
import Header from '../Components/LayoutsCom/Header.jsx';
import Footer from '../Components/LayoutsCom/Footer.jsx';

export default function StandarLayout() {
  return (
    <>
      <Header/>
      <main className=' w-full min-h-[50vh]'>
        <Outlet></Outlet>
      </main>
      <Footer  />
    </>
  );
}