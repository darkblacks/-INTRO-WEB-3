import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../../contexts/AuthContext'
import type Tema from '../../../models/Tema'
import type Postagem from '../../../models/Postagem'
import { buscar, cadastrar, atualizar, deletar } from '../../../services/Service'

import '../css/Auth.css'
import '../../css/Blog.css'

function Blogfeed() {
  const { usuario, handleLogout } = useAuth()

  const [temas, setTemas] = useState<Tema[]>([])
  const [postagens, setPostagens] = useState<Postagem[]>([])

  const [temaFiltro, setTemaFiltro] = useState<number>(0)
  const [temaSelecionadoId, setTemaSelecionadoId] = useState<number>(0)
  const [criandoNovoTema, setCriandoNovoTema] = useState<boolean>(false)
  const [novoTema, setNovoTema] = useState<string>('')

  const [temaEditandoId, setTemaEditandoId] = useState<number | null>(null)
  const [descricaoTemaEditando, setDescricaoTemaEditando] = useState<string>('')

  const [postagemEditandoId, setPostagemEditandoId] = useState<number | null>(
    null
  )

  const [novaPostagem, setNovaPostagem] = useState({
    titulo: '',
    texto: '',
  })

  const estaLogado = usuario.token !== ''

  const header = {
    headers: {
      Authorization: usuario.token,
    },
  }

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, header)
    } catch (error) {
      console.error('Erro ao buscar temas:', error)
    }
  }

  async function buscarPostagens() {
    try {
      await buscar('/postagens', setPostagens, header)
    } catch (error) {
      console.error('Erro ao buscar postagens:', error)
    }
  }

  useEffect(() => {
    if (estaLogado) {
      buscarTemas()
      buscarPostagens()
    }
  }, [usuario.token])

  function atualizarPostagemCampo(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNovaPostagem({
      ...novaPostagem,
      [e.target.name]: e.target.value,
    })
  }

  function selecionarTemaExistente(idTema: number) {
    setTemaSelecionadoId(idTema)
    setCriandoNovoTema(false)
    setNovoTema('')
  }

  function selecionarNovoTema() {
    setTemaSelecionadoId(0)
    setCriandoNovoTema(true)
  }

  async function criarTemaAntesDaPostagem(): Promise<Tema> {
    const descricaoTema = novoTema.trim()

    if (!descricaoTema) {
      throw new Error('Informe um tema antes de publicar.')
    }

    if (descricaoTema.length < 3) {
      throw new Error('O tema precisa ter pelo menos 3 caracteres.')
    }

    const temaJaExiste = temas.find(
      (tema) =>
        tema.descricao.trim().toLowerCase() === descricaoTema.toLowerCase()
    )

    if (temaJaExiste) {
      return temaJaExiste
    }

    const temaCriado = await cadastrar<Tema>(
      '/temas',
      { descricao: descricaoTema },
      () => {},
      header
    )

    await buscarTemas()

    return temaCriado
  }

  async function obterTemaFinal(): Promise<Tema | null> {
    if (criandoNovoTema) {
      return await criarTemaAntesDaPostagem()
    }

    if (!temaSelecionadoId) {
      return null
    }

    return temas.find((tema) => tema.id === temaSelecionadoId) || null
  }

  async function salvarPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (novaPostagem.titulo.trim() === '') {
      alert('Digite um título para a postagem.')
      return
    }

    if (novaPostagem.texto.trim() === '') {
      alert('Digite o texto da postagem.')
      return
    }

    if (!criandoNovoTema && temaSelecionadoId === 0) {
      alert('Selecione um tema ou crie um novo.')
      return
    }

    try {
      const temaFinal = await obterTemaFinal()

      if (!temaFinal?.id) {
        alert('Tema inválido.')
        return
      }

      const postagemParaEnviar = {
        titulo: novaPostagem.titulo.trim(),
        texto: novaPostagem.texto.trim(),
        autor: usuario.nome || usuario.usuario || 'Autor não identificado',
        tema: {
          id: temaFinal.id,
        },
      }

      if (postagemEditandoId) {
        await atualizar(
  '/postagens',
  {
    id: postagemEditandoId,
    ...postagemParaEnviar,
  },
  () => {},
  header
)
      } else {
        await cadastrar('/postagens', postagemParaEnviar, () => {}, header)
      }

      limparFormularioPostagem()

      await buscarTemas()
      await buscarPostagens()
    } catch (error: any) {
      console.error('Erro ao salvar postagem:', error)
      console.error('Resposta da API:', error.response?.data)

      const mensagem =
        error.response?.data?.message ||
        error.message ||
        'Erro ao salvar postagem.'

      alert(Array.isArray(mensagem) ? mensagem.join('\n') : mensagem)
    }
  }

  function editarPostagem(postagem: Postagem) {
    setPostagemEditandoId(postagem.id)
    setNovaPostagem({
      titulo: postagem.titulo,
      texto: postagem.texto,
    })
    setTemaSelecionadoId(postagem.tema?.id || 0)
    setCriandoNovoTema(false)
    setNovoTema('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function deletarPostagem(id: number) {
    const confirmar = window.confirm('Deseja deletar esta postagem?')

    if (!confirmar) {
      return
    }

    try {
      await deletar(`/postagens/${id}`, header)
      await buscarPostagens()
    } catch (error: any) {
      console.error('Erro ao deletar postagem:', error)
      console.error('Resposta da API:', error.response?.data)
      alert('Erro ao deletar postagem.')
    }
  }

  function limparFormularioPostagem() {
    setNovaPostagem({
      titulo: '',
      texto: '',
    })

    setTemaSelecionadoId(0)
    setCriandoNovoTema(false)
    setNovoTema('')
    setPostagemEditandoId(null)
  }

  function iniciarEdicaoTema(tema: Tema) {
    setTemaEditandoId(tema.id)
    setDescricaoTemaEditando(tema.descricao)
  }

  function cancelarEdicaoTema() {
    setTemaEditandoId(null)
    setDescricaoTemaEditando('')
  }

  async function salvarEdicaoTema(id: number) {
    const descricao = descricaoTemaEditando.trim()

    if (descricao.length < 3) {
      alert('O tema precisa ter pelo menos 3 caracteres.')
      return
    }

    try {
      await atualizar<Tema>(
        '/temas',
        {
          id,
          descricao,
        },
        () => {},
        header
      )

      cancelarEdicaoTema()
      await buscarTemas()
      await buscarPostagens()
    } catch (error: any) {
      console.error('Erro ao atualizar tema:', error)
      console.error('Resposta da API:', error.response?.data)

      const mensagem =
        error.response?.data?.message ||
        error.message ||
        'Erro ao atualizar tema.'

      alert(Array.isArray(mensagem) ? mensagem.join('\n') : mensagem)
    }
  }

  async function deletarTema(id: number) {
    const temaPossuiPostagens = postagens.some(
      (postagem) => postagem.tema?.id === id
    )

    if (temaPossuiPostagens) {
      alert(
        'Este tema possui postagens vinculadas. Delete ou edite as postagens antes de deletar o tema.'
      )
      return
    }

    const confirmar = window.confirm('Deseja deletar este tema?')

    if (!confirmar) {
      return
    }

    try {
      await deletar(`/temas/${id}`, header)

      if (temaSelecionadoId === id) {
        setTemaSelecionadoId(0)
      }

      if (temaFiltro === id) {
        setTemaFiltro(0)
      }

      await buscarTemas()
    } catch (error: any) {
      console.error('Erro ao deletar tema:', error)
      console.error('Resposta da API:', error.response?.data)
      alert('Erro ao deletar tema.')
    }
  }

  const postagensFiltradas =
    temaFiltro === 0
      ? postagens
      : postagens.filter((postagem) => postagem.tema?.id === temaFiltro)

  return (
    <main className="blog-page">
      <section className="blog-hero-text" style={{ textAlign: 'center' }}>
        <span className="blog-tag">Feed</span>

        <h2>Blog Pessoal</h2>

        <p>
          Compartilhe ideias, aprendizados e experiências com a comunidade.
        </p>
      </section>

      {!estaLogado ? (
        <section className="composer-card composer-locked">
          <h4>Acesso restrito</h4>

          <p>Você precisa estar logado para visualizar e publicar no feed.</p>

          <Link to="/blog/login">Ir para login</Link>
        </section>
      ) : (
        <>
          <section className="composer-card">
            <form onSubmit={salvarPostagem}>
              <div className="composer-user">
                <div className="composer-avatar">
                  {usuario.foto ? (
                    <img src={usuario.foto} alt={usuario.nome} />
                  ) : (
                    <span>{usuario.nome?.charAt(0) || 'U'}</span>
                  )}
                </div>

                <div>
                  <Link
  to="/blog/perfil"
  style={{
    color: '#fff',
    textDecoration: 'none',
  }}
>
  <strong>{usuario.nome || usuario.usuario}</strong>
</Link>

<small>{usuario.usuario}</small>
                </div>
              </div>

              {postagemEditandoId && (
                <p style={{ color: '#f4c7ff', marginBottom: '12px' }}>
                  Editando postagem #{postagemEditandoId}
                </p>
              )}

              <input
                type="text"
                name="titulo"
                placeholder="Título da postagem"
                value={novaPostagem.titulo}
                onChange={atualizarPostagemCampo}
                style={{
                  border: '1px solid rgba(244, 199, 255, 0.22)',
                  background: '#141018',
                  color: '#fff',
                  borderRadius: '18px',
                  padding: '16px',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />

              <textarea
                name="texto"
                placeholder="O que você quer compartilhar hoje?"
                value={novaPostagem.texto}
                onChange={atualizarPostagemCampo}
                maxLength={500}
              />

              <div className="composer-theme-area">
                <p style={{ marginBottom: '10px', color: '#d8c3e8' }}>
                  Escolha um tema:
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '12px',
                  }}
                >
                  {temas.map((tema) => (
                    <button
                      key={tema.id}
                      type="button"
                      onClick={() => selecionarTemaExistente(tema.id)}
                      style={{
                        border:
                          temaSelecionadoId === tema.id && !criandoNovoTema
                            ? '1px solid #f4c7ff'
                            : '1px solid rgba(244, 199, 255, 0.22)',
                        background:
                          temaSelecionadoId === tema.id && !criandoNovoTema
                            ? '#3a2346'
                            : '#141018',
                        color: '#fff',
                        borderRadius: '999px',
                        padding: '10px 16px',
                        cursor: 'pointer',
                      }}
                    >
                      {tema.descricao}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={selecionarNovoTema}
                    style={{
                      border: criandoNovoTema
                        ? '1px solid #f4c7ff'
                        : '1px solid rgba(244, 199, 255, 0.22)',
                      background: criandoNovoTema ? '#3a2346' : '#141018',
                      color: '#fff',
                      borderRadius: '999px',
                      padding: '10px 16px',
                      cursor: 'pointer',
                    }}
                  >
                    + Novo tema
                  </button>
                </div>

                {criandoNovoTema && (
                  <div className="new-theme-box">
                    <input
                      type="text"
                      placeholder="Digite o novo tema"
                      value={novoTema}
                      onChange={(e) => setNovoTema(e.target.value)}
                    />

                    <small style={{ color: '#b99fc4' }}>
                      Se o tema já existir, ele será reutilizado.
                    </small>
                  </div>
                )}
              </div>

              <div className="composer-footer">
                <small>{novaPostagem.texto.length}/500</small>

                <div className="composer-actions">
                  {postagemEditandoId && (
                    <button type="button" onClick={limparFormularioPostagem}>
                      Cancelar
                    </button>
                  )}

                  <button type="submit">
                    {postagemEditandoId ? 'Salvar' : 'Postar'}
                  </button>

                  <button type="button" onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              </div>
            </form>
          </section>

          <section className="composer-card">
            <h4>Gerenciar temas</h4>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '12px',
              }}
            >
              {temas.length === 0 ? (
                <p>Nenhum tema cadastrado.</p>
              ) : (
                temas.map((tema) => (
                  <div
                    key={tema.id}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    {temaEditandoId === tema.id ? (
                      <>
                        <input
                          type="text"
                          value={descricaoTemaEditando}
                          onChange={(e) =>
                            setDescricaoTemaEditando(e.target.value)
                          }
                          style={{
                            border: '1px solid rgba(244, 199, 255, 0.22)',
                            background: '#141018',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '10px',
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => salvarEdicaoTema(tema.id)}
                        >
                          Salvar
                        </button>

                        <button type="button" onClick={cancelarEdicaoTema}>
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            border: '1px solid rgba(244, 199, 255, 0.22)',
                            borderRadius: '999px',
                            padding: '8px 14px',
                          }}
                        >
                          {tema.descricao}
                        </span>

                        <button
                          type="button"
                          onClick={() => iniciarEdicaoTema(tema)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => deletarTema(tema.id)}
                        >
                          Deletar
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="composer-card">
            <h4>Filtrar postagens por tema</h4>

            <select
              value={temaFiltro}
              onChange={(e) => setTemaFiltro(Number(e.target.value))}
            >
              <option value={0}>Todos os temas</option>

              {temas.map((tema) => (
                <option key={tema.id} value={tema.id}>
                  {tema.descricao}
                </option>
              ))}
            </select>
          </section>

          <section className="timeline">
            {postagensFiltradas.length === 0 ? (
              <article className="tweet-card">
                <div className="tweet-content">
                  <p>Nenhuma postagem cadastrada na API.</p>
                </div>
              </article>
            ) : (
              postagensFiltradas.map((postagem) => (
                <article className="tweet-card" key={postagem.id}>
                  <div className="tweet-avatar">
                    <img
                      src={
                        postagem.autor === usuario.nome && usuario.foto
                          ? usuario.foto
                          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                      }
                      alt={postagem.autor || 'Usuário'}
                    />
                  </div>

                  <div className="tweet-content">
                    <div className="tweet-header">
                      <strong>{postagem.autor || 'Usuário'}</strong>

                      <small>{postagem.tema?.descricao || 'Sem tema'}</small>
                    </div>

                    <h3>{postagem.titulo}</h3>

                    <p>{postagem.texto}</p>

                    <small
                      style={{
                        display: 'block',
                        marginTop: '12px',
                        color: '#b99fc4',
                      }}
                    >
                      {postagem.data
                        ? `Publicado em ${new Date(
                            postagem.data
                          ).toLocaleDateString('pt-BR')}`
                        : 'Sem data'}
                    </small>

                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '14px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => editarPostagem(postagem)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => deletarPostagem(postagem.id)}
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </>
      )}
    </main>
  )
}

export default Blogfeed