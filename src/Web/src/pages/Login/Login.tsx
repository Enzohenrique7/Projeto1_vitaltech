import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo_maya.png"
import { useAuth } from "../../context/AuthContext"
import { loginUsuario, mensagemErroLogin } from "../../services/auth"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      setErro("Preencha o e-mail e a senha.")
      return
    }

    setErro("")
    setLoading(true)

    try {
      await loginUsuario(email, senha)
      login(email)
      navigate("/patients")
    } catch (e) {
      setErro(mensagemErroLogin(e instanceof Error ? e.message : ""))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
      <div style={{ width: "400px" }}>

        <div className="text-center mb-5">
          <img src={logo} alt="Maya Yamamoto RPG" style={{ height: "150px" }} />
        </div>

        <div className="mb-3">
          <label style={{ fontWeight: "500" }}>Email</label>
          <input
            type="email"
            className="form-control mt-1"
            style={{ backgroundColor: "#e9e9e9", border: "none", borderRadius: "20px", padding: "10px 16px" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label style={{ fontWeight: "500" }}>Senha</label>
          <input
            type="password"
            className="form-control mt-1"
            style={{ backgroundColor: "#e9e9e9", border: "none", borderRadius: "20px", padding: "10px 16px" }}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        {erro && (
          <div className="mb-3" style={{ backgroundColor: "#fdecea", border: "1px solid #EE715F", borderRadius: "8px", padding: "10px 14px", color: "#EE715F", fontSize: "14px", fontWeight: "500" }}>
            {erro}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ backgroundColor: "#01577A", color: "white", border: "none", borderRadius: "8px", padding: "10px 40px", fontWeight: "500", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login
