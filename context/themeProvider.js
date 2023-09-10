import { createContext } from "react";
import { useTheme } from 'next-themes'

export const themeContext = createContext()

export default function ThemeModeProvider({children}){
    const { theme, setTheme} = useTheme();

    return(
        <themeContext.Provider value={{theme, setTheme}}>
            {children}
        </themeContext.Provider>
    )
}