import Mangas from "./Pages/Mangas"
import Manga from "./Pages/Manga"
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import './App.css'

let router = createBrowserRouter([{
  path:"/mangas",element:<Mangas></Mangas>
},{
  path:"/manga",element:<Manga></Manga>
}])
function App() {


  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
