import { useState } from "react"
import { useNavigate } from "react-router-dom"

const pacienteMock = {
  id_usuario: 1,
  nome: "Maria Mendonça",
  nascimento: "1990-05-10",
  telefone: "11999999999",
  is_ativo: true,
  prontuario: {
    id_prontuario: 1,
    data_inicio: "2024-08-21",
    classificacao: "Moderado" as const,
    orientacoes: [
      { id_orientacao: 1, orientacao: "Evitar esforço físico intenso", data_orientacao: "2024-08-21" },
      { id_orientacao: 2, orientacao: "Realizar exercícios em casa diariamente", data_orientacao: "2024-08-28" },
    ],
    queixas: [
      { id_queixa: 1, queixa: "Dor lombar crônica", data_queixa: "2024-08-21" },
    ],
    sinais: [
      { id_sinal: 1, sinal: "Dor", escala: 7 },
      { id_sinal: 2, sinal: "Mobilidade lombar", escala: 5 },
    ],
    avaliacoes: [
      { id_avaliacao: 1, avaliacao: "Paciente apresenta melhora postural significativa", data_avaliacao: "2024-09-03" },
    ],
    exercicios: [
      { id_exercicio: 1, titulo: "Alongamento Cervical", orientacoes: "Realizar devagar, sem forçar" },
      { id_exercicio: 2, titulo: "Respiração Diafragmática", orientacoes: "5 repetições, inspirar 4 tempos, expirar 6" },
    ],
  }
}

type Secao = "orientacoes" | "exercicios" | "prontuario"

function PatientProfile() {
  const navigate = useNavigate()
  const [secoesAbertas, setSecoesAbertas] = useState({
    orientacoes: false,
    exercicios: false,
    prontuario: false,
  })
  const p = pacienteMock
  const pr = p.prontuario

  function toggleSecao(secao: Secao) {
    setSecoesAbertas(prev => ({ ...prev, [secao]: !prev[secao] }))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>

      <button
        onClick={() => navigate("/patients")}
        style={{ background: "none", border: "none", color: "#3EBAD2", fontWeight: "bold", fontSize: "16px", marginBottom: "16px", cursor: "pointer" }}>
        ← Voltar
      </button>

      {/*paciente*/}
      <div style={{
        backgroundColor: "#EE715F",
        borderRadius: "12px",
        padding: "24px",
        color: "white",
        display: "flex",
        gap: "24px",
        alignItems: "center",
        marginBottom: "32px"
      }}>
        {/*avatar*/}
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          backgroundColor: "#f0c080", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "32px", flexShrink: 0
        }}>
          👤
        </div>

        {/*informações*/}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "8px" }}>{p.nome}</div>
          <div>Classificação: {pr.classificacao}</div>
          <div>Início do tratamento: {pr.data_inicio}</div>
          <div>Telefone: {p.telefone}</div>
          <div>Data de nascimento: {p.nascimento}</div>
        </div>

        {/*status*/}
        <div style={{ fontWeight: "bold", fontSize: "16px", alignSelf: "flex-start" }}>
          Status: {p.is_ativo ? "Ativo" : "Inativo"}
        </div>
      </div>

      {/*seções*/}
      <div className="d-flex flex-column gap-3">

        {/*orientações*/}
        <div>
          <div
            onClick={() => toggleSecao("orientacoes")}
            style={{ color: "#3EBAD2", fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}
          >
            Orientações {secoesAbertas.orientacoes ? "▲" : "▼"}
          </div>
          {secoesAbertas.orientacoes && (
            <div className="mt-2 d-flex flex-column gap-2">
              {pr.orientacoes.map(o => (
                <div key={o.id_orientacao} style={{ backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "12px 16px" }}>
                  <div>{o.orientacao}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{o.data_orientacao}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*exercícios prescritos*/}
        <div>
          <div onClick={() => toggleSecao("exercicios")} style={{ color: "#3EBAD2", fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}>
            Exercícios Prescritos {secoesAbertas.exercicios ? "▲" : "▼"}
          </div>
          {secoesAbertas.exercicios && (
            <div className="mt-2 d-flex flex-column gap-2">
              {pr.exercicios.map(e => (
                <div key={e.id_exercicio} style={{ backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "12px 16px" }}>
                  <div style={{ fontWeight: "bold", color: "#01577A" }}>{e.titulo}</div>
                  <div style={{ fontSize: "14px", color: "#555", marginTop: "4px" }}>{e.orientacoes}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*prontuário completo*/}
        <div>
          <div
            onClick={() => toggleSecao("prontuario")} style={{ color: "#3EBAD2", fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}>
            Prontuário Completo {secoesAbertas.prontuario ? "▲" : "▼"}
          </div>
          {secoesAbertas.prontuario && (
            <div className="mt-2 d-flex flex-column gap-3">
              <div>
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Queixas</div>
                {pr.queixas.map(q => (
                  <div key={q.id_queixa} style={{ backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "12px 16px", marginBottom: "8px" }}>
                    <div>{q.queixa}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{q.data_queixa}</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Sinais</div>
                {pr.sinais.map(s => (
                  <div key={s.id_sinal} style={{ backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "12px 16px", marginBottom: "8px" }}>
                    <div>{s.sinal} — Escala: {s.escala}/10</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Avaliações</div>
                {pr.avaliacoes.map(a => (
                  <div key={a.id_avaliacao} style={{ backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "12px 16px", marginBottom: "8px" }}>
                    <div>{a.avaliacao}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{a.data_avaliacao}</div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default PatientProfile
