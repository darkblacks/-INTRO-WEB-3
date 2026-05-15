import type Tema from "./Tema";
export default interface Postagem {
  id: number
  titulo: string
  texto: string
  autor: string
  data: string
  tema: Tema | null
}