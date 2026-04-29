import '../css/Home.css'
import { Link } from 'react-router-dom'

const banners = [
  {
    src: '/banner.png',
    alt: 'Ynana Merx segurando um violão no palco',
  },
  {
    src: '/banner3.jpg',
    alt: 'Ynana Merx tocando violão em apresentação',
  },
  {
    src: '/banner2.jpg',
    alt: 'Ynana Merx em show neon',
  },
]

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-texto">
          <h2>Ynana Merx</h2>

          <p>
            Graças à evolução da inteligência artificial, Ynana emerge dos
            algoritmos diretamente para suas telas. Não é apenas uma cantora — é
            uma construção digital, um eco de dados, estética e emoção compilados
            em forma de voz.
          </p>

          <p>
            Com traços inspirados no imaginário japonês, orelhas de raposa e uma
            presença que mistura o etéreo com o tecnológico, Ynana não nasce:
            ela é renderizada.
          </p>

          <p>
            Desde os primeiros passos das vocaloids, a inteligência artificial vem
            refinando sua capacidade de interpretar, criar e emocionar. O que
            antes era sintético, hoje é experiência. O que antes era código, hoje
            é identidade.
          </p>

          <p>
            É nesse ponto que surge o projeto <strong>Ynana Merx</strong>, uma
            biblioteca viva de sentimentos, sons e narrativas digitais.
          </p>

          <p>
            Cada faixa é um registro. Cada arte, um fragmento de memória. Cada
            interação, uma nova escrita dentro desse sistema.
          </p>

          <Link to="/musicas" className="btn-link">
  Conhecer músicas
</Link>
        </div>

        <div className="hero-galeria">
          {banners.map((banner, index) => (
            <div className="hero-imagem" key={index}>
              <img src={banner.src} alt={banner.alt} />
            </div>
          ))}
        </div>
      </section>

      <section className="sobre">
        <h3>Sobre a artista</h3>
        <p>
          Com uma identidade visual gótica e poética, Ynana canta sobre sonhos,
          liberdade, mistério e sentimentos intensos.
        </p>
      </section>
    </main>
  )
}

export default Home