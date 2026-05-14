import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import type UsuarioLogin from '../../../models/UsuarioLogin'
import { useAuth } from '../../../contexts/AuthContext'
import '../css/Auth.css'

function Login() {
  const { handleLogin, isLoading } = useAuth()

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  })

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    })
  }

  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await handleLogin(usuarioLogin)
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={entrar}>
        <span className="auth-label">Acesso</span>

        <h2>Entrar no Blog</h2>

        <p>
          Entre para acessar o feed e interagir com as postagens da Ynana Merx.
        </p>

        <label>
          Usuário
          <input
            type="text"
            name="usuario"
            placeholder="Digite seu usuário"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
            required
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        <small>
          Ainda não tem conta? <Link to="/blog/cadastro">Cadastre-se</Link>
        </small>
      </form>
    </section>
  )
}

export default Login