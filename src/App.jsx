import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Layouts
import StandarLayout from "./Layouts/StandarLayout";

//Pages
import Home from "./Pages/Home";
import Chapter from "./Pages/Chapter";
import NotFound from "./Pages/NotFound";
import EditProfile from './Components/Profile/ProfileComponent';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ChangeRol from './Pages/ChangeRol';
import EditManga from "./Pages/EditManga"
import EditChapter from "./Pages/EditChapter"
import NewChapter from "./Pages/CreateChapter"
import NewManga from "./Pages/CreateManga"
import NewAuthor from "./Pages/NewAuthor"
import NewCompany from "./Pages/NewCompany"
import FavoritesPage from "./Pages/Favorites";
import PanelPage from "./Pages/PanelAdmin";
import Profile from "./Pages/Profile";
import GoogleAuthHandler from "./Components/Login/GoogleHandler";
import Mangas from "./Pages/Mangas"
import Manga from "./Pages/Manga"

const router = createBrowserRouter([{
  element: <StandarLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/editProfile", element: <EditProfile /> },      
    { path: "/chapter", element: <Chapter /> },
    { path: "/editManga/:title", element: <EditManga /> },
    { path: "/editChapter", element: <EditChapter /> },
    { path: "/newManga", element: <NewManga /> },
    { path: `/newChapter/:id`, element: <NewChapter /> },
    { path: "/newAuthor", element: <NewAuthor /> },
    { path: "/newCompany", element: <NewCompany /> },
    { path: "/favorites", element: <FavoritesPage /> },
    { path: "/panel", element: <PanelPage /> },
    { path: "/profile", element: <Profile /> },
    { path: "/signin", element: <Login /> },
    { path: "/signup", element: <Register /> },
    { path: "/rol", element: <ChangeRol /> },
    { path: "/mangas", element: <Mangas /> },
    { path: "/manga", element: <Manga /> }
  ]
}, {
  path: "/auth/google/callback",
  element: <GoogleAuthHandler />
}, {
  path: "/*",
  element: <NotFound />
}]);

function App() {
  return (
    <>
      <RouterProvider router={router} />     
    </>
  )
}

export default App