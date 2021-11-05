import { createContext, useReducer } from "react";
import { projectAuth } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,

            };
       

        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });



    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}