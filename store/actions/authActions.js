// import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// const setUser = createAction("setUser", (datos)=>{
//     return {
//         payload:datos,
//     }
// })




// const login = createAsyncThunk("login", async({email,password}) => {
//     console.log("Login");
//     const credentials = {
//         correo:email,
//         contraseña:password
//     }
//     try {
//         const response = await axios.post("http://localhost:2020/api/auth/signIn",credentials)

//         console.log("Se proceso la solicitud");
//     console.log("Response",response.data);
//     console.log("Login completado");

    
    
//     localStorage.setItem("token",response.data.token)
//     return response.data
//     } catch (error) {
//         console.log("No se proseso la solicitud");
        
//     }
    
// }) 

// export {login,setUser};