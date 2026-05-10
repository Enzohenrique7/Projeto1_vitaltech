# VitalTech - Sistema de Gerenciamento de Fisioterapia

<p align="center">
  <img src="Imagens/LogoVitalTech.png" alt="Logo VitalTech" width="30%" />
</p>

## 📋 Sobre o Projeto

**VitalTech** é uma solução digital completa desenvolvida por estudantes da FECAP (Fundação de Comércio Álvares Penteado) do curso de Ciências da Computação, como projeto integralizador (PI). O objetivo é modernizar e otimizar a gestão de clínicas de fisioterapia.

### 🎯 Objetivo Principal
Desenvolver uma plataforma integrada que conecte pacientes, profissionais de saúde e administradores em um ecossistema único, facilitando o acompanhamento de exercícios, registros de evolução e gerenciamento administrativo.

---

## 👥 Equipe

### Integrantes
- [Enzo Henrique](https://github.com/Enzohenrique7)
- [Harry Zhu](https://github.com/harryzuh)
- [Murilo Ângelo](https://github.com/Mura173)
- [Vitor Kolle](https://github.com/vitorkolle)

### Professores Orientadores
- [Katia Bossi](https://www.linkedin.com/in/katia-bossi/)
- [Marco Aurélio](https://www.linkedin.com/in/marco-aurelio-lima-barbosa/)
- [Rodrigo da Rosa](https://www.linkedin.com/in/rodrigo-da-rosa-phd/)
- [Victor Rosetti](https://www.linkedin.com/in/victorbarq/)

---

## 🏗️ Arquitetura da Solução

O projeto é composto por três componentes principais:

### 1. **Aplicativo Android** 📱
- Aplicativo mobile para pacientes
- Acesso ao plano de exercícios prescritos
- Registro de execução de exercícios
- Acompanhamento de evolução e progresso
- Interface amigável e responsiva

### 2. **Frontend Web** 🖥️
- Painel administrativo web
- Gerenciamento de pacientes
- Visualização e edição de prontuários
- Banco de dados de exercícios
- Relatórios e análises
- Acesso para profissionais e administradores

### 3. **Backend** ⚙️
- API RESTful para comunicação
- Gerenciamento de dados da clínica
- Controle de acesso e autenticação
- Integração entre aplicativo e painel web
- Banco de dados centralizado

---

## 🗂️ Estrutura de Pastas

```
Projeto1_vitaltech/
├── src/
│   ├── Android/          # Código do aplicativo Android
│   ├── Backend/          # Código do servidor Node.js/TypeScript
│   └── Web/              # Código do painel administrativo React
├── Documentos/
│   ├── Entrega 1/        # Documentação da primeira entrega
│   │   ├── Análise Descritiva de Dados
│   │   ├── Programação Orientada a Objetos
│   │   ├── Programação para Dispositivos Móveis
│   │   ├── Projeto Interdisciplinar Web
│   │   └── Projeto Interdisciplinar Móvel
│   └── Entrega 2/        # Documentação da segunda entrega
├── Imagens/              # Assets e imagens do projeto
└── README.md             # Este arquivo
```

---

## 🚀 Começando

### Pré-requisitos

Certifique-se de ter instalado:
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Git**
- **Java Development Kit (JDK)** (para Android)
- **Android Studio** (para emular Android)

### Clonando o Repositório

```bash
git clone https://github.com/Enzohenrique7/Projeto1_vitaltech.git
cd Projeto1_vitaltech
```

---

## 💻 Configuração para Desenvolvimento

### 🔧 Backend (Node.js)

```bash
# Acesse o diretório do backend
cd src/Backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env com as configurações necessárias
cp .env.example .env

# Inicie o servidor em modo desenvolvimento
npm run dev
```

**Servidor rodará em:** `http://localhost:3000`

---

### 🎨 Frontend (React/TypeScript)

```bash
# Em outro terminal, acesse o diretório do frontend
cd src/Web

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

**Frontend estará disponível em:** `http://localhost:5173`

---

### 📱 Android

```bash
# Acesse o diretório do Android
cd src/Android

# Build APK de desenvolvimento
./gradlew build

# Ou use Android Studio para compilar e executar
```

---

## 🌐 Acessar o Projeto em Produção

**URL:** https://mayayamamoto-vitaltech.vercel.app/

**Credenciais de Demonstração:**
- **Email:** maya@vitaltech.com
- **Senha:** senha123

---

## 📊 Stack Tecnológico

| Componente | Tecnologias |
|-----------|-------------|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Node.js, TypeScript, Express |
| **Mobile** | Android, Java/Kotlin |
| **Banco de Dados** | PostgreSQL / MongoDB |
| **Deploy** | Vercel (Frontend), Heroku/Railway (Backend) |

---

## 📄 Documentação e Entregas

### Entrega 1
- [Análise Descritiva de Dados](Documentos/Entrega%201/Análise%20Descritiva%20de%20Dados)
- [Programação Orientada a Objetos](Documentos/Entrega%201/Programação%20Orientada%20a%20Objetos)
- [Aplicação Android](src/Android)
- [Projeto Interdisciplinar](Documentos/Entrega%201)

### Entrega 2
- [Documentação em desenvolvimento...]

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do Backend com as seguintes variáveis:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DATABASE_URL=seu_url_banco_dados

# Autenticação
JWT_SECRET=sua_chave_secreta_jwt

# API
API_BASE_URL=http://localhost:3000
```

---

## 📋 Funcionalidades Principais

### Para Pacientes 👨‍⚕️
- ✅ Visualizar plano de exercícios personalizado
- ✅ Registrar execução de exercícios
- ✅ Acompanhar progresso e evolução
- ✅ Receber notificações de lembretes
- ✅ Comunicação com profissionais

### Para Profissionais 👩‍⚕️
- ✅ Gerenciar pacientes e prontuários
- ✅ Prescrever exercícios personalizados
- ✅ Acompanhar aderência do paciente
- ✅ Gerar relatórios de evolução
- ✅ Comunicação bidirecional com pacientes

### Para Administradores 🔐
- ✅ Gerenciar usuários (pacientes e profissionais)
- ✅ Manter banco de dados de exercícios
- ✅ Gerar relatórios administrativos
- ✅ Controle de permissões e acesso
- ✅ Análise de dados do sistema

---

## 🧪 Testes

```bash
# Backend
cd src/Backend
npm run test

# Frontend
cd src/Web
npm run test
```

---

## 📝 Contribuindo

Este é um projeto acadêmico. Para contribuições:

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato com os integrantes da equipe através de seus perfis no GitHub.

---

## 📜 Licença

Este projeto está licenciado sob a Licença Creative Commons Attribution-ShareAlike 4.0 International.

![CC License](https://mirrors.creativecommons.org/presskit/icons/cc.svg)
![CC-BY](https://mirrors.creativecommons.org/presskit/icons/by.svg)
![CC-SA](https://mirrors.creativecommons.org/presskit/icons/sa.svg)

© 2026 - VitalTech por [Enzo Henrique Neves Sena](https://github.com/Enzohenrique7), [Harry Zhu](https://github.com/harryzuh), [Murilo Angelo](https://github.com/Mura173) e [Vitor Kolle](https://github.com/vitorkolle)

---

## 🎓 Referências

- [Maya Yamamoto RPG](https://mayayamamoto.com.br/)
- [FECAP](https://www.fecap.br/)

---

**Última atualização:** 10 de Maio de 2026
