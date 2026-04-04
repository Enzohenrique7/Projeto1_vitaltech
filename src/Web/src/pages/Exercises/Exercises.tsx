import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const exerciciosMock = [
  {
    id_exercicio: 1,
    titulo: 'Alongamento Cervical',
    descricao: 'Exercício para relaxamento da região cervical com foco na musculatura posterior do pescoço.',
    orientacoes: 'Realizar devagar, sem forçar. Repetir 3 séries de 30 segundos.',
    imagens: [
      { link_imagem: 'https://exemplo.com/imagens/alongamento-cervical-1.jpg' },
      { link_imagem: 'https://exemplo.com/imagens/alongamento-cervical-2.jpg' },
    ],
    tags: [{ nome: 'RPG' }, { nome: 'Cervical' }],
  },
  {
    id_exercicio: 2,
    titulo: 'Facilitação Neuromuscular Proprioceptiva',
    descricao: 'Técnica de Kabat aplicada nos membros inferiores para ganho de força e coordenação.',
    orientacoes: 'Realizar com auxílio do profissional. 3 séries de 10 repetições por lado.',
    imagens: [
      { link_imagem: 'https://exemplo.com/imagens/kabat-mmii-1.jpg' },
    ],
    tags: [{ nome: 'Kabat' }, { nome: 'Membros Inferiores' }, { nome: 'RPG' }],
  },
  {
    id_exercicio: 3,
    titulo: 'Mobilização Lombar',
    descricao: 'Mobilização articular da região lombar para alívio de tensão e melhora da amplitude de movimento.',
    orientacoes: 'Pressão moderada. Evitar em casos de hérnia discal aguda.',
    imagens: [
      { link_imagem: 'https://exemplo.com/imagens/mobilizacao-lombar-1.jpg' },
      { link_imagem: 'https://exemplo.com/imagens/mobilizacao-lombar-2.jpg' },
    ],
    tags: [{ nome: 'Lombar' }, { nome: 'Mobilização' }],
  },
  {
    id_exercicio: 4,
    titulo: 'Respiração Diafragmática',
    descricao: 'Exercício de reeducação respiratória com ênfase no diafragma, base do RPG.',
    orientacoes: 'Inspirar pelo nariz em 4 tempos, expirar pela boca em 6 tempos. 5 repetições.',
    imagens: [],
    tags: [{ nome: 'RPG' }, { nome: 'Respiração' }],
  },
]

function Exercises() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')

  const exerciciosFiltrados = exerciciosMock.filter(e =>
    e.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    e.tags.some(t => t.nome.toLowerCase().includes(busca.toLowerCase()))
  )

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>

      <h2 className="text-center mb-4" style={{ color: '#3EBAD2', fontWeight: 'bold', letterSpacing: '2px' }}>
        EXERCICIOS
      </h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Pesquisar por título ou tag"
          className="form-control"
          style={{ borderRadius: '8px', maxWidth: '400px' }}
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <button
          onClick={() => navigate('/exercicios/new')}
          style={{ backgroundColor: '#01577A', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: '500', cursor: 'pointer' }}
        >
          + Novo Exercício
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        {exerciciosFiltrados.map(exercicio => (
          <div
            key={exercicio.id_exercicio}
            style={{ backgroundColor: '#f5f5f5', borderRadius: '12px', padding: '16px 24px', border: '1px solid #e0e0e0' }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#01577A' }}>
                  {exercicio.titulo}
                </div>
                <div style={{ color: '#555', marginTop: '4px' }}>
                  {exercicio.descricao}
                </div>
                <div style={{ color: '#777', fontSize: '14px', marginTop: '4px' }}>
                  {exercicio.orientacoes}
                </div>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {exercicio.tags.map(tag => (
                    <span
                      key={tag.nome}
                      style={{ backgroundColor: '#3EBAD2', color: 'white', borderRadius: '20px', padding: '2px 12px', fontSize: '13px' }}
                    >
                      {tag.nome}
                    </span>
                  ))}
                </div>
              </div>
              <div className="d-flex gap-2">
                
                {exercicio.imagens.length > 0 && (
                  <a
                    href={exercicio.imagens[0].link_imagem}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: '#EE715F', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 16px', fontWeight: '500', textDecoration: 'none', fontSize: '14px' }}
                  >
                    Ver Imagens
                  </a>
                )}
                <button
                  onClick={() => navigate(`/exercicios/${exercicio.id_exercicio}`)}
                  style={{ backgroundColor: '#01577A', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 16px', fontWeight: '500', cursor: 'pointer', fontSize: '14px' }}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Exercises