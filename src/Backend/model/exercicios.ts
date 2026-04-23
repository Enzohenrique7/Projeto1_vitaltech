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
      data.tags.forEach(async (tag) => {
        let verifyTag = await verificarTag(tag)

        if (verifyTag) {
          prisma.exericios_tags.create({
            data: {
              id_exercicio: exercicio.id_exercicio,
              id_tag: verifyTag
            }
          })
        }

        else{
          let newTag = await cadastrarTag(tag)

          if (!newTag) return false

          prisma.exericios_tags.create({
            data: {
              id_exercicio: exercicio.id_exercicio,
              id_tag: newTag.id_tag
            }
          })
        }
      })

      data.imagens.forEach(async (imagem) => {
        let verifyImage = await verificarImagem(imagem)

        if (verifyImage) {
          prisma.imagens_exercicios.create({
            data: {
              id_exercicio: exercicio.id_exercicio,
              link_imagem: imagem.link_imagem
            }
          })

          return data
        }

        else{
          let newImage = await cadastrarImagem(imagem)

          if (!newImage) return false

          prisma.imagens_exercicios.create({
            data: {
              id_exercicio: exercicio.id_exercicio,
              link_imagem: imagem.link_imagem
            }   
          })

          return data
        }
      })
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