import { prisma } from "../libs/prisma.ts";
import type { TExercicio, TImagem, TTag } from "../types/types.ts";
import { WELL_SUCCEDED_REGISTER } from "../util/messages.ts";

export async function cadastrarExercicio(data: TExercicio) {
  try {
    let exercicio = await prisma.exercicios.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        orientacoes: data.orientacoes,
      },
      select: {
        id_exercicio: true,
      }
    });

    if (exercicio) {
      await Promise.all(data.tags.map(async (tag) => {
        let verifyTag = await verificarTag(tag)

        if (verifyTag) {
          await prisma.exericios_tags.create({
            data: {
              id_exercicio: exercicio.id_exercicio,
              id_tag: verifyTag
            }
          })
        } else {
          let newTag = await cadastrarTag(tag)
          if (!newTag) return
          await prisma.exericios_tags.create({
            data: {
              id_exercicio: exercicio.id_exercicio,
              id_tag: newTag.id_tag
            }
          })
        }
      }))

      await Promise.all(data.imagens.map(async (imagem) => {
        await prisma.imagens_exercicios.create({
          data: {
            id_exercicio: exercicio.id_exercicio,
            link_imagem: imagem.link_imagem
          }
        })
      }))

      return exercicio
    }

    else return false

  } catch (error) {
    console.log(error)
    return false
  }
}

export async function verificarTag(data: TTag): Promise<number | false> {
  try {

    let tagData = await prisma.tags.findFirst({
        where: {
          tag: data.tag
        },
        select: {
          id_tag: true
        }
      })

    return tagData?.id_tag || false

  } catch (error) {
    console.log(error)
    return false
  }
}

export async function cadastrarTag(data: TTag) {
  try {
    let tag = await prisma.tags.create({
      data: {
        tag: data.tag
      },
      select: {
        id_tag: true
      }
    })

    return tag

  } catch (error) {
    console.log(error)
    return false  
  }
}

export async function verificarImagem(data: TImagem): Promise<number | false> {
  try {

    let imageData = await prisma.imagens_exercicios.findFirst({
        where: {
          link_imagem: data.link_imagem
        },
        select: {
          id_imagem: true
        }
      })

    return imageData?.id_imagem || false

  } catch (error) {
    console.log(error)
    return false
  }
}

export async function cadastrarImagem(data: TImagem) {
  try {
    let image = await prisma.imagens_exercicios.create({
      data: {
        link_imagem: data.link_imagem,
        id_exercicio: data.id_exercicio
      },
      select: {
        id_imagem: true
      }
    })

    return image

  } catch (error) {
    console.log(error)
    return false
  }
}

export async function buscarExercicios() {
  try {
    return await prisma.exercicios.findMany({
      include: {
        exericios_tags: {
          include: { tags: true }
        },
        imagens_exercicios: true
      }
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function deletarExercicio(id: number) {
  try {
    await prisma.exercicios.delete({ where: { id_exercicio: id } })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}