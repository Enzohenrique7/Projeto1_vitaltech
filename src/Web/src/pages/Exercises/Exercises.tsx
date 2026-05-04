import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { listarExercicios, deletarExercicio, type ExercicioItem } from "../../services/exercicios"
import { ApiError } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

function Exercises() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [busca, setBusca] = useState("")
  const [exercicios, setExercicios] = useState<ExercicioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  const [alvoDelete, setAlvoDelete] = useState<ExercicioItem | null>(null)
  const [senha, setSenha] = useState("")
  const [deleteErro, setDeleteErro] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    listarExercicios()
      .then(setExercicios)
      .catch(() => setErro("Erro ao carregar exercícios."))
      .finally(() => setLoading(false))
  }, [])

  const exerciciosFiltrados = exercicios.filter(e =>
    e.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    e.exericios_tags.some(et => et.tags.tag.toLowerCase().includes(busca.toLowerCase()))
  )

  const abrirModal = (exercicio: ExercicioItem) => {
    setAlvoDelete(exercicio)
    setSenha("")
    setDeleteErro("")
  }

  const fecharModal = () => {
    setAlvoDelete(null)
    setSenha("")
    setDeleteErro("")
  }

  const confirmarDelete = async () => {
    if (!alvoDelete || !user?.email) return
    setDeleteErro("")
    setDeleteLoading(true)
    try {
      await deletarExercicio(alvoDelete.id_exercicio, user.email, senha)
      setExercicios(prev => prev.filter(e => e.id_exercicio !== alvoDelete.id_exercicio))
      fecharModal()
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) setDeleteErro("Senha incorreta.")
      else if (e instanceof ApiError && e.status === 404) setDeleteErro("Usuário não encontrado.")
      else if (e instanceof ApiError) setDeleteErro(`Erro ${e.status}: ${e.message}`)
      else setDeleteErro("Erro de conexão.")
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>

      <h2 className="text-center mb-4" style={{ color: "#3EBAD2", fontWeight: "bold", letterSpacing: "2px" }}>
        EXERCICIOS
      </h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Pesquisar por título ou tag"
          className="form-control"
          style={{ borderRadius: "8px", maxWidth: "400px" }}
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <button
          onClick={() => navigate("/exercicios/new")}
          style={{ backgroundColor: "#01577A", color: "white", border: "none", borderRadius: "8px", padding: "8px 20px", fontWeight: "500", cursor: "pointer" }}
        >
          + Novo Exercício
        </button>
      </div>

      {loading && (
        <div className="text-center" style={{ color: "#777", marginTop: "32px" }}>
          Carregando exercícios...
        </div>
      )}

      {erro && (
        <div style={{ backgroundColor: "#fdecea", border: "1px solid #EE715F", borderRadius: "8px", padding: "10px 14px", color: "#EE715F", fontSize: "14px" }}>
          {erro}
        </div>
      )}

      {!loading && !erro && exerciciosFiltrados.length === 0 && (
        <div className="text-center" style={{ color: "#777", marginTop: "32px" }}>
          Nenhum exercício encontrado.
        </div>
      )}

      <div className="d-flex flex-column gap-3">
        {exerciciosFiltrados.map(exercicio => (
          <div
            key={exercicio.id_exercicio}
            style={{ backgroundColor: "#f5f5f5", borderRadius: "12px", padding: "16px 24px", border: "1px solid #e0e0e0" }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div style={{ fontWeight: "bold", fontSize: "18px", color: "#01577A" }}>
                  {exercicio.titulo}
                </div>
                <div style={{ color: "#555", marginTop: "4px" }}>
                  {exercicio.descricao}
                </div>
                <div style={{ color: "#777", fontSize: "14px", marginTop: "4px" }}>
                  {exercicio.orientacoes}
                </div>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {exercicio.exericios_tags.map(et => (
                    <span
                      key={et.tags.tag}
                      style={{ backgroundColor: "#3EBAD2", color: "white", borderRadius: "20px", padding: "2px 12px", fontSize: "13px" }}
                    >
                      {et.tags.tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="d-flex gap-2">
                {exercicio.imagens_exercicios.length > 0 && (
                  <button
                    onClick={() => navigate(`/exercicios/${exercicio.id_exercicio}/imagens`, { state: { titulo: exercicio.titulo, imagens: exercicio.imagens_exercicios } })}
                    style={{ backgroundColor: "#EE715F", color: "white", border: "none", borderRadius: "8px", padding: "6px 16px", fontWeight: "500", cursor: "pointer", fontSize: "14px" }}
                  >
                    Ver Imagens
                  </button>
                )}
                <button
                  onClick={() => abrirModal(exercicio)}
                  style={{ backgroundColor: "#EE715F", color: "white", border: "none", borderRadius: "8px", padding: "6px 16px", fontWeight: "500", cursor: "pointer", fontSize: "14px" }}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alvoDelete && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
            <h5 style={{ color: "#01577A", fontWeight: "bold", marginBottom: "8px" }}>Confirmar exclusão</h5>
            <p style={{ color: "#555", marginBottom: "20px" }}>
              Digite sua senha para excluir <strong>"{alvoDelete.titulo}"</strong>. Esta ação não pode ser desfeita.
            </p>
            <input
              type="password"
              className="form-control"
              style={{ borderRadius: "8px", marginBottom: "12px" }}
              placeholder="Senha de administrador"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === "Enter" && confirmarDelete()}
              autoFocus
            />
            {deleteErro && (
              <div style={{ color: "#EE715F", fontSize: "13px", marginBottom: "12px" }}>
                {deleteErro}
              </div>
            )}
            <div className="d-flex gap-2">
              <button
                onClick={confirmarDelete}
                disabled={deleteLoading || !senha}
                style={{ backgroundColor: "#EE715F", color: "white", border: "none", borderRadius: "8px", padding: "8px 24px", fontWeight: "500", cursor: deleteLoading || !senha ? "not-allowed" : "pointer", opacity: deleteLoading || !senha ? 0.7 : 1 }}
              >
                {deleteLoading ? "Excluindo..." : "Confirmar"}
              </button>
              <button
                onClick={fecharModal}
                disabled={deleteLoading}
                style={{ backgroundColor: "#ccc", color: "#333", border: "none", borderRadius: "8px", padding: "8px 24px", fontWeight: "500", cursor: "pointer" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Exercises