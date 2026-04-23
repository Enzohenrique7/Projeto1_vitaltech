export type TPaciente = {
  id_paciente: number;
  nome: string;
  email: string;
  hash_senha: string;
  data_nascimento: Date;
  telefone: string;
};

export type TExercicio = {
  id_exercicio: string;
  titulo: string;
  descricao: string;
  orientacoes: string;
  tags: TTag[];
  imagens: TImagem[];
};

export type TTag = {
  id_tag: number;
  tag: string;
};

export type TImagem = {
  id_imagem: number;
  link_imagem: string;
  id_exercicio: number;
};
