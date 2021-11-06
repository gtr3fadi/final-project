import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                user: null
            };
        case "AUTH_READY":
            return {
                ...state,
                user: action.payload,
                AuthIsReady: true
            };
        default:
            return state;
    }
};

export  const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        AuthIsReady: false
    });

    console.log(state);

    useEffect(() => {
      const unsub=  projectAuth.onAuthStateChanged((user) => {
    dispatch({ type: "AUTH_READY", payload: user });
      })
        return () => {
            unsub();
        };
    }, []);
            
            
           



    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}


