import { auth } from "../firebase/firebase";
import React, { useState, useContext ,createContext, useEffect} from "react";


export const AuthContext =createContext();
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
     const unSubscibe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return unSubscibe
        
    }, []);
    
    if(Loading){
        return <div>Loading...</div>
    }
    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}




