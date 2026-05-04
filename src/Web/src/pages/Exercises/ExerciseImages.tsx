import { useLocation, useNavigate } from "react-router-dom"

interface LocationState {
  titulo: string
  imagens: Array<{ link_imagem: string }>
}


function ExerciseImages() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  if (!state) {
    navigate("/exercicios")
    return null
  }

  const { titulo, imagens } = state

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>

      <button
        onClick={() => navigate("/exercicios")}
        style={{ background: "none", border: "none", color: "#3EBAD2", fontWeight: "bold", fontSize: "16px", marginBottom: "16px", cursor: "pointer" }}
      >
        ← Voltar
      </button>

      <h2 style={{ color: "#3EBAD2", fontWeight: "bold", letterSpacing: "2px", marginBottom: "8px" }}>
        IMAGENS
      </h2>
      <div style={{ color: "#555", marginBottom: "32px", fontSize: "16px" }}>
        {titulo}
      </div>

      {imagens.length === 0 ? (
        <div style={{ color: "#777", textAlign: "center", marginTop: "48px" }}>
          Nenhuma imagem cadastrada para este exercício.
        </div>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {imagens.map((img, index) => (
            <div key={index} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e0e0", backgroundColor: "#f5f5f5" }}>
              <img
                src={img.link_imagem}
                alt={`${titulo} - imagem ${index + 1}`}
                style={{ width: "280px", height: "280px", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default ExerciseImages