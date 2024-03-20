import { Navigate, Outlet } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Puff } from "react-loader-spinner"
import { useAuth, AuthData } from "context/authProvider"
import { AuthService } from "services/authService"

const Authmiddleware = (props: any) => {
  const [user, setUser] = useAuth() as AuthData
  const [isLoading, setIsloading] = useState<boolean>(true)
  const token = localStorage.getItem("token")
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    AuthService.getMe().then(res => {  
        if (res.success) {
          setUser(res.data)
          setIsError(false)
        } else {
            setIsError(true)
        }
        setIsloading(false)
      }).catch(error => {
        setIsloading(false)
      })
  }, []);

  if(!token) {
    return <Navigate to={{ pathname: "/signin" }}  replace />
  } else {
    if (!isLoading) {
      if (user?.role === props.allowed) {
        return <Outlet />
      } else {
        return <Navigate to={{ pathname: "/not-found" }} replace />
      }
    } else {
      return <div className="d-flex justify-content-center align-items-center " style={{ height: "500px" }}>
      <Puff color="#FFD0B8" height={50} width={50} />
    </div>
    }
  }
}

export default Authmiddleware
