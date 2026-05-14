import BlogPostCard from '../post/BlogPostCard'

function BlogFeed() {
  const postagens = [
    {
      autor: 'Drielly',
      titulo: 'Primeira postagem do Blog Pessoal',
      texto:
        'Essa é uma postagem de exemplo para representar o feed do Blog Pessoal. Aqui o usuário poderá visualizar publicações com imagem, autor, data e categoria.',
      imagem:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
      data: '14/05/2026',
      categoria: 'Tecnologia',
    },
    {
      autor: 'Generation',
      titulo: 'Aprendendo React com componentes',
      texto:
        'O React permite dividir a interface em componentes reutilizáveis, facilitando a manutenção e a organização do projeto.',
      imagem:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      data: '14/05/2026',
      categoria: 'React',
    },
    {
      autor: 'Blog Pessoal',
      titulo: 'Organizando páginas com rotas',
      texto:
        'Com o React Router, conseguimos separar páginas como cadastro, login e feed, deixando o projeto mais próximo de uma aplicação real.',
      imagem:
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop',
      data: '14/05/2026',
      categoria: 'Front-end',
    },
  ]

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-5xl font-bold text-slate-900">
            Feed do Blog Pessoal
          </h1>

          <p className="text-lg text-slate-600">
            Veja as principais postagens publicadas na plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {postagens.map((postagem) => (
            <BlogPostCard
              key={postagem.titulo}
              autor={postagem.autor}
              titulo={postagem.titulo}
              texto={postagem.texto}
              imagem={postagem.imagem}
              data={postagem.data}
              categoria={postagem.categoria}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default BlogFeed