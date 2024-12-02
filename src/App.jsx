import Mangas from "./Pages/Mangas"
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import './App.css'

let router = createBrowserRouter([{
  path:"/mangas",element:<Mangas></Mangas>
}])
function App() {


  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
