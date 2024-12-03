import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Layouts
import StandarLayout from "./Layouts/StandarLayout";

//Pages
import Home from "./Pages/Home";
import Chapter from "./Pages/Chapter";
import NotFound from "./Pages/NotFound";
import Profile from './Components/Profile/ProfileComponent'
import EditManga from "./Pages/EditManga"


const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/chapter", element: <Chapter /> },
      { path: "/editManga", element: <EditManga /> },
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
