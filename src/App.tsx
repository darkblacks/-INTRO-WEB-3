import { Link, Route, Routes } from 'react-router-dom'

import Home from './Pages/tsx/Home'
import Musicas from './Pages/tsx/Musicas'

import Blogcadastro from './Pages/blog/cadastro/Blogcadastro'
import Bloglogin from './Pages/blog/login/Bloglogin'
import Blogfeed from './Pages/blog/feed/Blogfeed'
import Perfil from './Pages/perfil/Perfil'

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Ynana Merx</h1>

        <div>
          <Link to="/">Início</Link>
          <Link to="/musicas">Músicas</Link>
          <Link to="/blog/feed">Blog Feed</Link>
          <Link to="/blog/login">Blog Login</Link>
          <Link to="/blog/cadastro">Blog Cadastro</Link>
          <Link to="/blog/perfil">Perfil</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musicas" element={<Musicas />} />
        <Route path="/blog/feed" element={<Blogfeed />} />
        <Route path="/blog/login" element={<Bloglogin />} />
        <Route path="/blog/cadastro" element={<Blogcadastro />} />
        <Route path="/blog/perfil" element={<Perfil />} />
      </Routes>
    </>
  )
}

export default App