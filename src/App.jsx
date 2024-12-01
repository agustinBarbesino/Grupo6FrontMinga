import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Layouts
import StandarLayout from "./Layouts/StandarLayout";

//Pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Profile from './Components/Profile/ProfileComponent'


const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
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
