import axios from 'axios'

const api = axios.create({
  baseURL: 'https://web-jsts-atividade-crud-blog-pessoal.onrender.com',
})

export const cadastrarUsuario = async (
  url: string,
  dados: object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const login = async (
  url: string,
  dados: object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const buscar = async (
  url: string,
  setDados: Function,
  header: object
) => {
  const resposta = await api.get(url, header)
  setDados(resposta.data)
}

export const cadastrar = async <T>(
  url: string,
  dados: object,
  setDados: Function,
  header: object
): Promise<T> => {
  const resposta = await api.post<T>(url, dados, header)
  setDados(resposta.data)
  return resposta.data
}

export const atualizar = async <T>(
  url: string,
  dados: object,
  setDados: Function,
  header: object
): Promise<T> => {
  const resposta = await api.put<T>(url, dados, header)
  setDados(resposta.data)
  return resposta.data
}

export const deletar = async (
  url: string,
  header: object
): Promise<void> => {
  await api.delete(url, header)
}