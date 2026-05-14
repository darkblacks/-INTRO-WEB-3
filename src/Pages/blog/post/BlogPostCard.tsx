type BlogPostCardProps = {
  autor: string
  titulo: string
  texto: string
  imagem: string
  data: string
  categoria: string
}

function BlogPostCard({
  autor,
  titulo,
  texto,
  imagem,
  data,
  categoria,
}: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
      <img
        src={imagem}
        alt={titulo}
        className="w-full h-56 object-cover"
      />

      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{categoria}</span>
          <span>{data}</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">{titulo}</h2>

        <p className="text-slate-700 leading-relaxed">{texto}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-sm font-semibold text-slate-700">
            Por {autor}
          </span>

          <button className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold px-4 py-2 rounded">
            Ler mais
          </button>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard