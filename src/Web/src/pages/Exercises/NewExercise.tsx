import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { criarExercicio } from "../../services/exercicios"

function NewExercise() {
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [orientacoes, setOrientacoes] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [imagens, setImagens] = useState<string[]>([])
  const [urlInput, setUrlInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState(false)

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setTagInput("")
  }

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag))

  const removeImagem = (src: string) => setImagens(imagens.filter(i => i !== src))

  const addUrlImagem = () => {
    const url = urlInput.trim()
    if (url && !imagens.includes(url)) {
      setImagens(prev => [...prev, url])
    }
    setUrlInput("")
  }

  const handleSalvar = async () => {
    if (!titulo.trim() || !descricao.trim() || !orientacoes.trim()) {
      setErro("Título, descrição e orientações são obrigatórios.")
      return
    }

    setErro("")
    setLoading(true)

    try {
      await criarExercicio({ titulo, descricao, orientacoes, tags, imagens })
      setSucesso(true)
      setTimeout(() => navigate("/exercicios"), 2000)
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao cadastrar exercício.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>

      <button
        onClick={() => navigate("/exercicios")}
        style={{ background: "none", border: "none", color: "#3EBAD2", fontWeight: "bold", fontSize: "16px", marginBottom: "16px", cursor: "pointer" }}
      >
        ← Voltar
      </button>

      <h2 style={{ color: "#3EBAD2", fontWeight: "bold", letterSpacing: "2px", marginBottom: "32px" }}>
        NOVO EXERCÍCIO
      </h2>

      <div className="d-flex flex-column gap-3">

        <div>
          <label style={{ fontWeight: "500" }}>Título *</label>
          <input
            type="text"
            className="form-control mt-1"
            style={{ borderRadius: "8px" }}
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label style={{ fontWeight: "500" }}>Descrição *</label>
          <textarea
            className="form-control mt-1"
            style={{ borderRadius: "8px", resize: "vertical" }}
            rows={3}
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label style={{ fontWeight: "500" }}>Orientações *</label>
          <textarea
            className="form-control mt-1"
            style={{ borderRadius: "8px", resize: "vertical" }}
            rows={3}
            value={orientacoes}
            onChange={e => setOrientacoes(e.target.value)}
          />
        </div>

        <div>
          <label style={{ fontWeight: "500" }}>Tags</label>
          <div className="d-flex gap-2 mt-1">
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: "8px" }}
              placeholder="Ex: RPG, Cervical"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
            />
            <button
              onClick={addTag}
              style={{ backgroundColor: "#3EBAD2", color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", whiteSpace: "nowrap", cursor: "pointer" }}
            >
              Adicionar
            </button>
          </div>
          {tags.length > 0 && (
            <div className="d-flex gap-2 flex-wrap mt-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  style={{ backgroundColor: "#3EBAD2", color: "white", borderRadius: "20px", padding: "2px 12px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "0", fontSize: "14px", lineHeight: "1" }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label style={{ fontWeight: "500" }}>Imagens</label>
          <div className="d-flex gap-2 mt-1">
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: "8px" }}
              placeholder="Cole o link da imagem"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addUrlImagem())}
            />
            <button
              onClick={addUrlImagem}
              style={{ backgroundColor: "#3EBAD2", color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", whiteSpace: "nowrap", cursor: "pointer" }}
            >
              Adicionar
            </button>
          </div>
          {imagens.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {imagens.map((src, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <img
                    src={src}
                    alt={`imagem-${index + 1}`}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e0e0e0" }}
                  />
                  <button
                    onClick={() => removeImagem(src)}
                    style={{ position: "absolute", top: "-6px", right: "-6px", backgroundColor: "#EE715F", color: "white", border: "none", borderRadius: "50%", width: "20px", height: "20px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "1" }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {erro && (
        <div className="mt-3" style={{ backgroundColor: "#fdecea", border: "1px solid #EE715F", borderRadius: "8px", padding: "10px 14px", color: "#EE715F", fontSize: "14px", fontWeight: "500" }}>
          {erro}
        </div>
      )}

      {sucesso && (
        <div className="mt-3" style={{ backgroundColor: "#e8f8f5", border: "1px solid #3EBAD2", borderRadius: "8px", padding: "10px 14px", color: "#01577A", fontSize: "14px", fontWeight: "500" }}>
          Exercício cadastrado com sucesso! Redirecionando...
        </div>
      )}

      <div className="mt-4 d-flex gap-3">
        <button
          onClick={handleSalvar}
          disabled={loading || sucesso}
          style={{ backgroundColor: "#01577A", color: "white", border: "none", borderRadius: "8px", padding: "10px 32px", fontWeight: "500", fontSize: "16px", cursor: (loading || sucesso) ? "not-allowed" : "pointer", opacity: (loading || sucesso) ? 0.7 : 1 }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button
          onClick={() => navigate("/exercicios")}
          disabled={loading}
          style={{ backgroundColor: "#ccc", color: "#333", border: "none", borderRadius: "8px", padding: "10px 32px", fontWeight: "500", fontSize: "16px", cursor: "pointer" }}
        >
          Cancelar
        </button>
      </div>

    </div>
  )
}

export default NewExercise
