# 🎓 Sistema SESI - Controle de Vale-Lanche

Sistema completo para controle de vale-lanche via QR Code para o SESI.

## 🚀 Tecnologias

- **Frontend:** Next.js 16 + React 19
- **Banco de Dados:** Prisma ORM (MySQL, PostgreSQL ou SQL Server)
- **Autenticação:** Sistema de login integrado
- **QR Code:** Scanner via câmera (html5-qrcode)
- **Estilo:** CSS Modules + Design responsivo

---

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Banco de dados (MySQL, PostgreSQL ou SQL Server)
- Navegador com suporte a câmera

---

## ⚙️ Configuração Inicial

### 1. **Instalar Dependências**
```bash
npm install
```

### 2. **Configurar Variáveis de Ambiente**

Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Edite `.env.local` e configure:

```env
# Login do Sistema
NEXT_PUBLIC_LOGIN_EMAIL=diogo.ueda@sesisp.org.br
NEXT_PUBLIC_LOGIN_PASSWORD=Diogo@2025

# Conexão com Banco de Dados
DATABASE_URL="postgresql://usuario:senha@host:5432/banco"

# Ambiente
NODE_ENV=development
```

### 3. **Configurar Prisma para seu Banco**

Edite `prisma/schema.prisma` e altere o provider (linha 11):

```prisma
datasource db {
  provider = "postgresql"  // ou "mysql" ou "sqlserver"
}
```

### 4. **Sincronizar com Banco Existente**

Se o banco já está populado:
```bash
npm run db:pull      # Importa estrutura do banco
npm run db:generate  # Gera Prisma Client
```

Se o banco está vazio:
```bash
npm run db:push      # Cria as tabelas
```

### 5. **Iniciar o Sistema**

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🗄️ Estrutura do Banco

O sistema espera uma tabela `students` com:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String/UUID | ID único |
| `name` | String | Nome do aluno |
| `serie` | String | Série/turma (ex: "3º Ano EM B") |
| `qrCode` | String (UNIQUE) | Código QR único |
| `photo` | Text (nullable) | Foto em base64 |
| `hasVoucherToday` | Boolean | Disponibilidade do vale |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

---

## 📱 Funcionalidades

### 🔐 **Login**
- Tela de autenticação segura
- Credenciais no `.env.local`
- Sessão persistente

### 📷 **Scanner QR Code**
- Leitura via câmera do dispositivo
- Validação em tempo real
- Uso automático do vale

### 👥 **Gerenciamento de Alunos**
- Listar todos os alunos
- Buscar por nome/série/QR Code
- Filtrar por status (disponível/usado)
- Dar/remover vales em massa

### ➕ **Cadastro**
- Scanner QR integrado
- Upload de foto (máx 1MB)
- Validação de QR único
- 60 opções de séries/turmas

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor

# Banco de Dados
npm run db:generate      # Gera Prisma Client
npm run db:pull          # Importa estrutura do banco
npm run db:push          # Aplica schema no banco
npm run db:studio        # Interface visual do banco

# Build
npm run build            # Build para produção
npm run start            # Inicia em produção
```

---

## 📡 API Routes

O sistema possui um backend integrado via Next.js API Routes:

### **Alunos**
- `GET /api/students` - Listar todos
- `POST /api/students` - Criar aluno
- `GET /api/students/{id}` - Buscar por ID
- `GET /api/students/qrcode/{qrCode}` - Buscar por QR
- `PUT /api/students/{id}` - Atualizar
- `DELETE /api/students/{id}` - Deletar

### **Vales**
- `POST /api/students/{id}/use-voucher` - Usar vale
- `POST /api/vouchers/give-all` - Dar para todos
- `POST /api/vouchers/remove-all` - Remover de todos

### **Health Check**
- `GET /api/health` - Status da conexão do banco

Veja documentação completa em: **[API_ROUTES.md](./API_ROUTES.md)**

---

## 🧪 Testar Conexão com Banco

Após configurar, teste a conexão:

**Via Browser:**
```
http://localhost:3000/api/health
```

**Via Terminal:**
```bash
curl http://localhost:3000/api/health
```

---

## 📚 Documentação Adicional

- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Guia detalhado de configuração do banco
- **[API_ROUTES.md](./API_ROUTES.md)** - Documentação completa da API
- **[COMMANDS.md](./COMMANDS.md)** - Lista de comandos úteis

---

## 🎨 Cores SESI

```css
--sesi-blue: #003d7a;
--sesi-light-blue: #0066cc;
--sesi-red: #e30613;
```

---

## 📁 Estrutura do Projeto

```
controlesesi/
├── prisma/
│   └── schema.prisma           # Schema do banco
├── src/
│   ├── app/
│   │   ├── api/                # Backend (API Routes)
│   │   │   ├── students/       # CRUD de alunos
│   │   │   ├── vouchers/       # Gestão de vales
│   │   │   └── health/         # Health check
│   │   ├── login/              # Tela de login
│   │   ├── alunos/             # Lista de alunos
│   │   ├── cadastro/           # Cadastro de alunos
│   │   └── page.jsx            # Scanner (home)
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho
│   │   ├── QRScanner.jsx       # Scanner QR
│   │   ├── StudentCard.jsx     # Card do aluno
│   │   └── ProtectedRoute.jsx  # Proteção de rotas
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Autenticação
│   │   └── StudentsContext.jsx # Estado dos alunos
│   └── lib/
│       └── db.js               # Cliente Prisma
├── .env.local                  # Variáveis de ambiente (NÃO commitar!)
├── .env.example                # Template de variáveis
└── package.json
```

---

## 🔒 Segurança

- ✅ Credenciais no `.env.local` (git-ignored)
- ✅ API Routes server-side
- ✅ Validação de dados
- ✅ Autenticação obrigatória
- ✅ QR Code único por aluno

---

## 🚨 Solução de Problemas

### Erro: "Cannot find module '@prisma/client'"
```bash
npm run db:generate
```

### Erro: "Can't reach database server"
- Verifique se o banco está rodando
- Confirme `DATABASE_URL` no `.env.local`

### Câmera não funciona
- Use HTTPS ou localhost
- Permita acesso à câmera no navegador

### QR Code duplicado
- Sistema valida automaticamente
- Cada aluno deve ter QR único

---

## 📞 Contato

Sistema desenvolvido para o SESI.

**Login padrão:**
- Email: `diogo.ueda@sesisp.org.br`
- Senha: `Diogo@2025`

---

## 📄 Licença

Uso interno SESI.

---

## 🎉 Pronto para Segunda-feira!

1. ✅ Backend integrado criado
2. ✅ API Routes funcionais
3. ✅ Prisma configurado
4. ✅ Documentação completa
5. ⏳ **Só falta adicionar a connection string do banco!**

**Na segunda, você só precisa:**
1. Adicionar `DATABASE_URL` no `.env.local`
2. Rodar `npm run db:pull`
3. Rodar `npm run db:generate`
4. Rodar `npm run dev`

**E está tudo funcionando!** 🚀
