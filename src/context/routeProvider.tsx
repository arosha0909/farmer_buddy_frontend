import React, { useState } from "react"

type ProtectedRoute = [boolean, (isProtected: boolean) => void]

export const RouteContext = React.createContext<ProtectedRoute>([false, () => ({})])

export const RouteProvider = ({ children }: any) => {
  const [isProtected, setIsProtected] = useState<boolean>(false)

  return <RouteContext.Provider value={[isProtected, setIsProtected]}>{children}</RouteContext.Provider>
}