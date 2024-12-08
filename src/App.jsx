// src/App.jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import { selectIsAuthenticated, selectUser } from "./store/actions/authActions";

// Layouts
import StandarLayout from "./Layouts/StandarLayout";

// Pages
import Home from "./Pages/Home";
import Chapter from "./Pages/Chapter";
import NotFound from "./Pages/NotFound";
import EditProfile from './Components/Profile/ProfileComponent';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ChangeRol from './Pages/ChangeRol';
import EditManga from "./Pages/EditManga";
import EditChapter from "./Pages/EditChapter";
import NewChapter from "./Pages/CreateChapter";
import NewManga from "./Pages/CreateManga";
import NewAuthor from "./Pages/NewAuthor";
import NewCompany from "./Pages/NewCompany";
import FavoritesPage from "./Pages/Favorites";
import PanelPage from "./Pages/PanelAdmin";
import Profile from "./Pages/Profile";
import GoogleAuthHandler from "./Components/Login/GoogleHandler";
import Mangas from "./Pages/Mangas";
import Manga from "./Pages/Manga";
import Manager from './Pages/Manager';

const ProtectedRoute = ({ children, allowedRoles, requiresAuth = true, noAuth = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (noAuth) {
    return isAuthenticated ? <Navigate to="/" replace /> : children;
  }

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Verificación de roles
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  if (user && (user.role === 1 || user.role === 2) && user.active === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full">
          <strong className="font-bold">Access Restricted! </strong>
          <span className="block sm:inline">
            Your account is currently restricted. Please contact the administrator for assistance.
          </span>
        </div>
      </div>
    );
  }

  return children;

};

function App() {
  const router = createBrowserRouter([
    {
      element: <StandarLayout />,
      children: [
        // Rutas públicas
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/mangas", element: <Mangas /> },

        // Rutas para usuarios sin registro
        { 
          path: "/signin", 
          element: (
            <ProtectedRoute noAuth={true} requiresAuth={false}>
              <Login />
            </ProtectedRoute>
          )
        },
        { 
          path: "/signup", 
          element: (
            <ProtectedRoute noAuth={true} requiresAuth={false}>
              <Register />
            </ProtectedRoute>
          )
        },

        // Rutas para rol 0 
        {
          path: "/rol",
          element: (
            <ProtectedRoute allowedRoles={[0]}>
              <ChangeRol />
            </ProtectedRoute>
          )
        },
        {
          path: "/newAuthor",
          element: (
            <ProtectedRoute allowedRoles={[0, 3]}>
              <NewAuthor />
            </ProtectedRoute>
          )
        },
        {
          path: "/newCompany",
          element: (
            <ProtectedRoute allowedRoles={[0, 3]}>
              <NewCompany />
            </ProtectedRoute>
          )
        },

        // Rutas para usuarios autenticados (todos los roles)
        {
          path: "/favorites",
          element: (
            <ProtectedRoute requiresAuth={true}>
              <FavoritesPage />
            </ProtectedRoute>
          )
        },

        // Rutas para autores y compañías (roles 1, 2 y admin)
        {
          path: "/chapter",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Chapter />
            </ProtectedRoute>
          )
        },
        {
          path: "/editManga/:title",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EditManga />
            </ProtectedRoute>
          )
        },
        {
          path: "/editChapter/:title/:id",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EditChapter />
            </ProtectedRoute>
          )
        },
        {
          path: "/newManga",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <NewManga />
            </ProtectedRoute>
          )
        },
        {
          path: "/newChapter/:id",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <NewChapter />
            </ProtectedRoute>
          )
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Profile />
            </ProtectedRoute>
          )
        },
        {
          path: "/manga",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Manga />
            </ProtectedRoute>
          )
        },
        {
          path: "/manager",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Manager />
            </ProtectedRoute>
          )
        },
        {
          path: "/editProfile",
          element: (
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EditProfile />
            </ProtectedRoute>
          )
        },

        // Rutas solo para admin (rol 3)
        {
          path: "/panel",
          element: (
            <ProtectedRoute allowedRoles={[3]}>
              <PanelPage />
            </ProtectedRoute>
          )
        },
      ]
    },
    {
      path: "/auth/google/callback",
      element: <GoogleAuthHandler />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;