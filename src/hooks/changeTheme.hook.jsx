import { createContext, useContext, useState } from "react"

const ChangeThemeContext = createContext()

export function ThemeProvider({children}) {
    const themeLocalStorage = localStorage.getItem('theme')
    const [theme, setTheme] = useState(themeLocalStorage === null ? 'dark' : themeLocalStorage)

    function changeTheme(themeReceived) {
        if(themeReceived !== theme) {
            setTheme(themeReceived)
            localStorage.setItem('theme', themeReceived)
        }
    }

    return(
        <ChangeThemeContext.Provider value={{theme, changeTheme}}>
            { children }
        </ChangeThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ChangeThemeContext)

    return context
}