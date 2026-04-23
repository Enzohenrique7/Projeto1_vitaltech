import { cadastrarExercicio } from "../model/exercicios.ts";
import type { TExercicio } from "../types/types.ts";
import { ERROR_NOT_FOUND, ERROR_NOT_REGISTERED, ERROR_REQUIRED_FIELDS, ERROR_USED_EMAIL, WELL_SUCCEDED_REGISTER } from "../util/messages.ts";


export async function validarCadastroExercicio(data: TExercicio) {
  if (
    !data.titulo || data.titulo == undefined || data.titulo.length > 50 ||
    !data.descricao || data.descricao == undefined || data.descricao.length > 200 ||
    !data.orientacoes || data.orientacoes == undefined || data.orientacoes.length > 300
  ) {
    return {
      data: ERROR_REQUIRED_FIELDS,
      status: ERROR_REQUIRED_FIELDS.status_code
    }
  }

  data.tags.forEach((tag) => {
    if (!tag.tag || tag.tag == undefined || tag.tag.length > 45) {
      return {
        data: ERROR_REQUIRED_FIELDS,
        status: ERROR_REQUIRED_FIELDS.status_code
      }
    }
  })

  data.imagens.forEach((imagem) => {
    if (!imagem.link_imagem || imagem.link_imagem == undefined || imagem.link_imagem.length > 2048) {
      return {
        data: ERROR_REQUIRED_FIELDS,
        status: ERROR_REQUIRED_FIELDS.status_code
      }
    }
  })

  let exercicio = await cadastrarExercicio(data)

    if (exercicio) {
      return {
        data: exercicio,
        message: WELL_SUCCEDED_REGISTER.message,
        status: WELL_SUCCEDED_REGISTER.status_code
      }
    }

    else{
        return {
            data: ERROR_NOT_REGISTERED,
            status: ERROR_NOT_REGISTERED.status_code
        }
    }
}