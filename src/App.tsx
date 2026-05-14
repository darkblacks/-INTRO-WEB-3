import { Link, Route, Routes } from 'react-router-dom'

import Home from './Pages/tsx/Home'
import Musicas from './Pages/tsx/Musicas'
import BlogCadastro from './Pages/blog/cadastro/BlogCadastro'
import BlogLogin from './Pages/blog/login/BlogLogin'
import BlogFeed from './Pages/blog/feed/BlogFeed'

function App() {
  return (
    <>
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ynana Merx</h1>

        <div className="flex gap-6">
          <Link className="hover:text-indigo-300" to="/">
            Início
          </Link>

          <Link className="hover:text-indigo-300" to="/musicas">
            Músicas
          </Link>

          <Link className="hover:text-indigo-300" to="/blog/feed">
            Blog Feed
          </Link>

          <Link className="hover:text-indigo-300" to="/blog/login">
            Blog Login
          </Link>

          <Link className="hover:text-indigo-300" to="/blog/cadastro">
            Blog Cadastro
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musicas" element={<Musicas />} />
        <Route path="/blog/feed" element={<BlogFeed />} />
        <Route path="/blog/login" element={<BlogLogin />} />
        <Route path="/blog/cadastro" element={<BlogCadastro />} />
      </Routes>
    </>
  )
}

export default App