import { NavLink, Outlet } from 'react-router-dom'
import '../css/Blog.css'
import { useAuth } from '../../contexts/AuthContext'

function Blog() {
  const { usuario, handleLogout } = useAuth()

  return (
    <main className="blog-layout">
      <section className="blog-header">
        <div>
          <span className="blog-label">Blog Ynana Merx</span>
          <h2>Registros digitais da Ynana</h2>
          <p>
            Um espaço para postagens, temas, memórias e fragmentos narrativos
            conectados ao universo da artista.
          </p>
        </div>

        <nav className="blog-menu">
          <NavLink to="/blog/feed">Feed</NavLink>

          {usuario.token ? (
            <button onClick={handleLogout}>Sair</button>
          ) : (
            <>
              <NavLink to="/blog/login">Login</NavLink>
              <NavLink to="/blog/cadastro">Cadastro</NavLink>
            </>
          )}
        </nav>
      </section>

      <Outlet />
    </main>
  )
}

export default Blog