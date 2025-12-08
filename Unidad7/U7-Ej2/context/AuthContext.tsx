import { createContext, useContext, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    userName: string;
    loginUser: (name: string) => void;
    logoutUser: () => void;
}

// Si no hay provider, devolverá undefined, sino un AuthContextType, esto es para detectar el error en caso de que no usemos un provider. 
const AuthContext = createContext<AuthContextType|undefined>(undefined);

// Este tipo tiene una propiedad del tipo React.ReactNode, que es todos los componenetes de React
type Props = {children : React.ReactNode};

export function AuthProvider({children}: Props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userName, setUserName] = useState("");

    function loginUser(user: string) {
        setUserName(user)
        setIsLoggedIn(true)
    }

    function logoutUser() {
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, userName,loginUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return ctx;
};