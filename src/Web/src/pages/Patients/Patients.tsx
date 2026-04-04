import { useState } from "react"
import { useNavigate } from "react-router-dom"

const pacientesMock = [
  {
    id_usuario: 1,
    nome: "Maria Mendonça",
    nascimento: "1990-05-10",
    telefone: "11999999999",
    is_ativo: true,
    data_inicio: "2024-08-21",
  },
  {
    id_usuario: 2,
    nome: "Bruno Gomes Silveira",
    nascimento: "1985-03-22",
    telefone: "11988888888",
    is_ativo: true,
    data_inicio: "2024-08-29",
  },
  {
    id_usuario: 3,
    nome: "Ana Maria Brogui",
    nascimento: "1978-11-01",
    telefone: "11977777777",
    is_ativo: false,
    data_inicio: null,
  },
]

type FiltroStatus = "todos" | "ativo" | "inativo"

function Patients() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos")

  const pacientesFiltrados = pacientesMock.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase())
    const matchStatus =
      filtroStatus === "todos" ||
      (filtroStatus === "ativo" && p.is_ativo) ||
      (filtroStatus === "inativo" && !p.is_ativo)
    return matchBusca && matchStatus
  })

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 className="text-center mb-4" style={{ color: "#3EBAD2", fontWeight: "bold", letterSpacing: "2px" }}>
        PACIENTES
      </h2>

      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => navigate('/patients/new')}
          style={{ backgroundColor: '#01577A', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: '500', cursor: 'pointer'}}>
          Adicionar Paciente
        </button>
      </div>

      <div className="d-flex gap-3 mb-4 align-items-center">
        <input
          type="text"
          placeholder="Pesquisar"
          className="form-control"
          style={{ borderRadius: "8px", maxWidth: "400px" }}
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <select
          className="form-select"
          style={{ borderRadius: "8px", maxWidth: "160px" }}
          value={filtroStatus}
          onChange={e => setFiltroStatus(e.target.value as FiltroStatus)}
        >
          <option value="todos">Todos</option>
          <option value="ativo">Ativos</option>
          <option value="inativo">Inativos</option>
        </select>
      </div>

      <div className="d-flex flex-column gap-3">
        {pacientesFiltrados.map(paciente => (
          <div
            key={paciente.id_usuario}
            onClick={() => navigate(`/patients/${paciente.id_usuario}`)}
            style={{
              backgroundColor: "#EE715F",
              borderRadius: "12px",
              padding: "16px 24px",
              cursor: "pointer",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "18px", minWidth: "200px" }}>
              {paciente.nome}
            </div>
            <div style={{ flex: 1, paddingLeft: "24px" }}>
              <div>Início do tratamento: {paciente.data_inicio ?? "—"}</div>
              <div>Telefone: {paciente.telefone}</div>
            </div>
            <div style={{ fontWeight: "bold" }}>
              Status: {paciente.is_ativo ? "Ativo" : "Inativo"}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Patients
