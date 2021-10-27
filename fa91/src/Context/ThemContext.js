import { createContext ,useState} from "react";

export const ThemContext = createContext();

export const ThemContextProvider = ({ children }) => {

    const [theme, setTheme] = useState([
        { islightTheme: true },
        { light: { syntax: "#555", ui: "#ddd", bg: "#eee" } },
        { dark: { syntax: "#ddd", ui: "#333", bg: "#555" } }
    ]
    );
    
    return (
        <ThemContext.Provider value={{ theme}}>
        {children}
        </ThemContext.Provider>
    );
    };


