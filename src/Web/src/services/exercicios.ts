import { post, get, del } from "./api"

interface NovoExercicio {
    titulo: string
    descricao: string
    orientacoes: string
    tags: string[]
    imagens: string[]
}

export interface ExercicioItem {
    id_exercicio: number
    titulo: string
    descricao: string
    orientacoes: string
    exericios_tags: Array<{ tags: { tag: string } }>
    imagens_exercicios: Array<{ link_imagem: string }>
}

export async function listarExercicios(): Promise<ExercicioItem[]> {
    const res = await get<{ data: ExercicioItem[] }>("/listarExercicios")
    return res.data
}

export async function deletarExercicio(id: number, email: string, senha: string): Promise<void> {
    await del(`/exercicio/${id}`, { email, senha })
}

export async function criarExercicio(data: NovoExercicio): Promise<void> {
    await post("/cadastrarExercicio", {
        titulo: data.titulo,
        descricao: data.descricao,
        orientacoes: data.orientacoes,
        tags: data.tags.map(tag => ({ id_tag: 0, tag })),
        imagens: data.imagens.map(link_imagem => ({ id_imagem: 0, link_imagem, id_exercicio: 0 })),
    })
}
