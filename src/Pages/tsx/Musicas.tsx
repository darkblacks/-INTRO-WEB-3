import { useRef, useState } from 'react'
import '../css/Musicas.css'

type Musica = {
  titulo: string
  capa: string
  arquivo: string
}

const musicas: Musica[] = [
  {
    titulo: 'Discipline',
    capa: '/albumcapa/Discipline1-1024x1024.jpg',
    arquivo: '/Discipline.mp3',
  },
  {
    titulo: 'Play The Night',
    capa: '/albumcapa/Play-The-Night1-1024x1024.jpg',
    arquivo: '/Play-The-Night.mp3',
  },
  {
    titulo: "Inari's Whisper",
    capa: "/albumcapa/Inaris-Whisper1-1024x1024.jpg",
    arquivo: "/Inari's Whisper.mp3",
  },
   {
    titulo: "Beers in the Shade",
    capa: "/albumcapa/Beers-in-the-shade1-1024x1024.jpg",
    arquivo: "/Beers-in-the-shade.mp3",
  },
]

function Musicas() {
  const [tocando, setTocando] = useState<number | null>(null)
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])

  const togglePlay = (index: number) => {
    const audio = audioRefs.current[index]

    if (!audio) return

    // pausa todas
    audioRefs.current.forEach((a, i) => {
      if (a && i !== index) {
        a.pause()
        a.currentTime = 0
      }
    })

    if (tocando === index) {
      audio.pause()
      setTocando(null)
    } else {
      audio.play()
      setTocando(index)
    }
  }

  return (
    <main className="musicas">
      <h2>Músicas de Ynana Merx</h2>

      <div className="grid-musicas">
        {musicas.map((musica, index) => (
          <div key={index} className="card">
            <img src={musica.capa} alt={musica.titulo} />

            <h3>{musica.titulo}</h3>

            <button onClick={() => togglePlay(index)}>
              {tocando === index ? '⏸' : '▶'}
            </button>

            <audio
              ref={(el) => {
                audioRefs.current[index] = el
                }}
              src={musica.arquivo}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

export default Musicas