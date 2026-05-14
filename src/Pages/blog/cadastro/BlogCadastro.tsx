function BlogCadastro() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      <section className="hidden lg:block bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center bg-no-repeat" />

      <section className="flex flex-col justify-center items-center gap-8 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900">Cadastrar</h1>
          <p className="text-lg text-slate-600 mt-3">
            Crie sua conta no Blog Pessoal.
          </p>
        </div>

        <form className="flex flex-col gap-4 w-full max-w-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-xl text-slate-900">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

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
            <label htmlFor="foto" className="text-xl text-slate-900">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Insira o link da sua foto"
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

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmarSenha" className="text-xl text-slate-900">
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          <div className="flex justify-around gap-4 mt-4">
            <button
              type="reset"
              className="rounded bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-6"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded bg-indigo-400 hover:bg-indigo-900 text-white font-bold py-2 px-6"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default BlogCadastro