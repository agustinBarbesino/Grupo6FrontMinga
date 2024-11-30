

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './App.css'

const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      
    ],
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ]
  },
  { path: "/*", element: <NotFound /> },
]);
function App() {


  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
