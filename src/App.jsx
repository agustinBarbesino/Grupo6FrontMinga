import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Layouts
import StandarLayout from "./Layouts/StandarLayout";

//Pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
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
