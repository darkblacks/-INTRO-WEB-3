import axios, { type AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://web-jsts-atividade-crud-blog-pessoal.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const cadastrarUsuario = async (
  url: string,
  dados: object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (
  url: string,
  dados: object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: Function,
  header?: AxiosRequestConfig
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: object,
  setDados: Function,
  header?: AxiosRequestConfig
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: object,
  setDados: Function,
  header?: AxiosRequestConfig
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (
  url: string,
  header?: AxiosRequestConfig
) => {
  await api.delete(url, header);
};

export default api;