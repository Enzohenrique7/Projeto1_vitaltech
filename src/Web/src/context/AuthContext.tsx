import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface AuthState {
    email: string
}

interface AuthContextType {
    user: AuthState | null
    isAuthenticated: boolean
    login: (email: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = "maya_auth"

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthState | null>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? (JSON.parse(stored) as AuthState) : null
    })

    const login = (email: string) => {
        const state: AuthState = { email }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        setUser(state)
    }

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth deve ser usado dentro do AuthProvider")
    return ctx
}
