import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:5000",
})

export class ApiError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

export async function post<T>(path: string, body: unknown): Promise<T> {
    try {
        const res = await api.post<T>(path, body)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const msg = (e.response.data as { message?: string }).message ?? `Erro ${e.response.status}`
            throw new ApiError(e.response.status, msg)
        }
        throw e
    }
}

export async function get<T>(path: string): Promise<T> {
    try {
        const res = await api.get<T>(path)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const msg = (e.response.data as { message?: string }).message ?? `Erro ${e.response.status}`
            throw new ApiError(e.response.status, msg)
        }
        throw e
    }
}

export async function del<T>(path: string, body?: unknown): Promise<T> {
    try {
        const res = await api.delete<T>(path, { data: body })
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const msg = (e.response.data as { message?: string }).message ?? `Erro ${e.response.status}`
            throw new ApiError(e.response.status, msg)
        }
        throw e
    }
}
