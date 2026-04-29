import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/tsx/Home'
import Musicas from './Pages/tsx/Musicas'

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Ynana Merx</h1>

        <div>
          <Link to="/">Início</Link>
          <Link to="/musicas">Músicas</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musicas" element={<Musicas />} />
      </Routes>
    </>
  )
}

export default App