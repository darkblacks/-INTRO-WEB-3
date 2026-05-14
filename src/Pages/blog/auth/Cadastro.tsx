import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type Usuario from '../../../models/Usuario'
import { cadastrarUsuario } from '../../../services/Service'
import '../css/Auth.css'

function Cadastro() {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
  })

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
  }

  async function cadastrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await cadastrarUsuario('/usuarios/cadastrar', usuario, () => {})

      alert('Usuário cadastrado com sucesso!')
      navigate('/blog/login')
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      alert('Erro ao cadastrar usuário.')
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={cadastrar}>
        <span className="auth-label">Cadastro</span>

        <h2>Criar conta</h2>

        <p>
          Cadastre-se para acessar o blog e acompanhar as postagens da Ynana.
        </p>

        <label>
          Nome
          <input
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            value={usuario.nome}
            onChange={atualizarEstado}
            required
          />
        </label>

        <label>
          Usuário
          <input
            type="text"
            name="usuario"
            placeholder="Digite seu usuário"
            value={usuario.usuario}
            onChange={atualizarEstado}
            required
          />
        </label>

        <label>
          Foto
          <input
            type="text"
            name="foto"
            placeholder="URL da sua foto"
            value={usuario.foto}
            onChange={atualizarEstado}
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={usuario.senha}
            onChange={atualizarEstado}
            required
          />
        </label>

        <button type="submit">Cadastrar</button>

        <small>
          Já tem conta? <Link to="/blog/login">Entrar</Link>
        </small>
      </form>
    </section>
  )
}

export default Cadastro