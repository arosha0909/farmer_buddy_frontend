import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "models/user";

export type AuthData = [User | undefined, (user: User) => void, () => void];

const AuthContext = React.createContext<AuthData>([undefined, () => {}, () => {}]);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();


  const logout = () => {
    navigate(`/signin`, { replace: true });
    localStorage.removeItem("token");
    setUser({} as any);
    //refresh the client browser after signout for safe end Crisp chat session
    window.location.reload();
  };

  return <AuthContext.Provider value={[user, setUser, logout]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

type UserData = [User | undefined, (user: User | undefined) => void];
const UserContext = React.createContext<UserData>([undefined, () => ({})]);

export default UserContext;
