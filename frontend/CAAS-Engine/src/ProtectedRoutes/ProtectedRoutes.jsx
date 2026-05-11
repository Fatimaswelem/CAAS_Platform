import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoutes(props) {
  const {userData} = useContext(AuthContext)

  if(localStorage.getItem('token') || userData){
    return props.children
  }else{
    return <Navigate to={'/login'}/>
  }
}