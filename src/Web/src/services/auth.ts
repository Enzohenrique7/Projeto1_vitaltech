import axios from "axios"
import { api } from "./api"

export type LoginErro = "credenciais" | "nao_encontrado" | "servidor" | "conexao"

export async function loginUsuario(email: string, senha: string): Promise<void> {
    try {
        await api.post("/login", { email, senha })
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const status = e.response.status
            if (status === 401) throw new Error("credenciais")
            if (status === 404) throw new Error("nao_encontrado")
            throw new Error("servidor")
        }
        throw new Error("conexao")
    }
}

export function mensagemErroLogin(tipo: string): string {
    const mensagens: Record<string, string> = {
        credenciais: "E-mail ou senha incorretos.",
        nao_encontrado: "Usuário não encontrado.",
        servidor: "Erro ao realizar login. Tente novamente.",
        conexao: "Não foi possível conectar ao servidor.",
    }
    return mensagens[tipo] ?? "Erro desconhecido."
}
