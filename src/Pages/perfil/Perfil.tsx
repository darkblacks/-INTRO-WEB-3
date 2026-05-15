import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

import '../blog/css/Auth.css'
import '../css/Blog.css'

function Perfil() {
  const { usuario, handleLogout } = useAuth()

  const estaLogado = usuario.token !== ''

  if (!estaLogado) {
    return (
      <main className="blog-page">
        <section className="composer-card composer-locked">
          <h4>Acesso restrito</h4>

          <p>Você precisa estar logado para visualizar seu perfil.</p>

          <Link to="/blog/login">Ir para login</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="blog-page">
      <section className="blog-hero-text" style={{ textAlign: 'center' }}>
        <span className="blog-tag">Perfil</span>

        <h2>Meu Perfil</h2>

        <p>Visualize suas informações de usuário cadastradas no sistema.</p>
      </section>

      <section className="composer-card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(244, 199, 255, 0.35)',
              background: '#141018',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            {usuario.foto ? (
              <img
                src={usuario.foto}
                alt={usuario.nome}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <span>{usuario.nome?.charAt(0) || 'U'}</span>
            )}
          </div>

          <div>
            <h3 style={{ color: '#fff', marginBottom: '6px' }}>
              {usuario.nome || 'Usuário'}
            </h3>

            <p style={{ color: '#b99fc4', marginBottom: '4px' }}>
              {usuario.usuario}
            </p>

            <small style={{ color: '#d8c3e8' }}>Usuário logado</small>
          </div>
        </div>
      </section>

      <section className="composer-card">
        <h4>Dados da conta</h4>

        <div
          style={{
            display: 'grid',
            gap: '14px',
            marginTop: '16px',
          }}
        >
          <div>
            <small style={{ color: '#b99fc4' }}>ID</small>
            <p style={{ color: '#fff' }}>{usuario.id}</p>
          </div>

          <div>
            <small style={{ color: '#b99fc4' }}>Nome</small>
            <p style={{ color: '#fff' }}>{usuario.nome || 'Não informado'}</p>
          </div>

          <div>
            <small style={{ color: '#b99fc4' }}>Usuário / E-mail</small>
            <p style={{ color: '#fff' }}>
              {usuario.usuario || 'Não informado'}
            </p>
          </div>

          <div>
            <small style={{ color: '#b99fc4' }}>Foto</small>
            <p style={{ color: '#fff', wordBreak: 'break-all' }}>
              {usuario.foto || 'Não informada'}
            </p>
          </div>
        </div>
      </section>

      <section className="composer-card">
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/blog/feed">
            <button type="button">Voltar para o feed</button>
          </Link>

          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </section>
    </main>
  )
}

export default Perfil