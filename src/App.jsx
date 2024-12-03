import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Layouts
import StandarLayout from "./Layouts/StandarLayout";

//Pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Profile from './Components/Profile/ProfileComponent'
import EditManga from "./Pages/EditManga"
import EditChapter from "./Pages/EditChapter"
import NewChapter from "./Pages/CreateChapter"
import NewManga from "./Pages/CreateManga"


const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/editManga", element: <EditManga /> },
      { path: "/editChapter", element: <EditChapter /> },
      { path: "/newManga", element: <NewManga /> },
      { path: "/newChapter", element: <NewChapter /> },
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
