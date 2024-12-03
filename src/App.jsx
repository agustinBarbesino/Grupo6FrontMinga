import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Layouts
import StandarLayout from "./Layouts/StandarLayout";

//Pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Profile from './Components/Profile/ProfileComponent';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ChangeRol from './Pages/ChangeRol';


const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/signin", element: <Login /> },
      { path: "/signup", element: <Register /> },
      { path: "/rol", element: <ChangeRol /> }
    ],
  },
  
  { path: "/*", element: <NotFound /> },
]);
function App() {

  return (
    <>
      <RouterProvider router={router} />     
    </>
  )
}

export default App
