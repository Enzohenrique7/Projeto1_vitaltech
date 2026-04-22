import { prisma } from "../libs/prisma.ts";
import type { TExercicio } from "../types/types.ts";

export async function cadastrarExercicio(data: TExercicio) {
  try {
    let exercicio = await prisma.exercicios.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        orientacoes: data.orientacoes,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}
