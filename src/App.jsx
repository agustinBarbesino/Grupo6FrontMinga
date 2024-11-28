
import { NotFound } from "./Pages/NotFound"
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import './App.css'

let router = createBrowserRouter([{
  element:<LayoutPrincipal></LayoutPrincipal>,
  children:[{
  path:"/",element//: la direccion
}]},{
  path:"/*",element: <NotFound></NotFound>
}])
function App() {


  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
