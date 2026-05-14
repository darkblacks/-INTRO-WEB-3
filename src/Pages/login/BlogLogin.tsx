function BlogLogin() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <section className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900">Entrar</h1>
          <p className="text-lg text-slate-600 mt-3">
            Acesse sua conta no Blog Pessoal.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="usuario" className="text-xl text-slate-900">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu usuário"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="text-xl text-slate-900">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-indigo-500 hover:bg-indigo-900 text-white font-bold py-2 px-6 mt-4"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}

export default BlogLogin