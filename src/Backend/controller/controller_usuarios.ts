import { CriptografarSenha, ValidarSenha } from "../libs/bcrypt.ts";
import { buscarPaciente, CadastrarPaciente, LoginUsuario, ValidarEmail } from "../model/usuarios.ts";
import type { NovoPaciente } from "../types/types.ts";
import { ERROR_INVALID_CREDENTIALS, ERROR_NOT_FOUND, ERROR_REQUIRED_FIELDS, ERROR_USED_EMAIL, WELL_SUCCEDED_LOGIN } from "../util/messages.ts";

export async function ValidarCadastroPaciente(data: NovoPaciente) {
    if (
        !data.nome || data.nome == undefined || data.nome.length > 100 ||
        !data.email || data.email == undefined || data.email.length > 256 ||
        !data.hash_senha || data.hash_senha == undefined || data.hash_senha.length > 200 ||
        !data.data_nascimento || data.data_nascimento == undefined || !(new Date(data.data_nascimento)) ||
        !data.telefone || data.telefone == undefined || data.telefone.length > 15
    ) {
        return {
            data: ERROR_REQUIRED_FIELDS,
            status: ERROR_REQUIRED_FIELDS.status_code
        }
    }

    let verificarEmail = await ValidarEmail(data.email)
    if (!verificarEmail) {
        return {
            data: ERROR_USED_EMAIL,
            status: ERROR_USED_EMAIL.status_code
        }
    }

    data.data_nascimento = new Date(data.data_nascimento)
    data.hash_senha = await CriptografarSenha(data.hash_senha)

    let cadastrarPaciente = await CadastrarPaciente(data)
    return {
        data: cadastrarPaciente,
        status: cadastrarPaciente ? 201 : 400
    }
}

export async function ValidarLoginUsuario(email: string, senha: string) {
    if (
        !email || email == undefined || email.length > 256 ||
        !senha || senha == undefined
    ) {
        return ERROR_REQUIRED_FIELDS
    }

    let login = await LoginUsuario(email) as false | { hash_senha: string; id_usuario: number }

    if (login) {
        if (await ValidarSenha(senha, login.hash_senha)) {

            const userData = await buscarPaciente(login.id_usuario)

            return {
                data: userData,
                status_code: WELL_SUCCEDED_LOGIN.status_code,
                message: WELL_SUCCEDED_LOGIN.message
            }
        } else {
            return ERROR_INVALID_CREDENTIALS
        }
    }else{
        return ERROR_NOT_FOUND
    }
}