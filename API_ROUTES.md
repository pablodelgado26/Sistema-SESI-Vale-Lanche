# 📡 API ROUTES - SESI Vale-Lanche

## 🔗 Endpoints Disponíveis

Base URL: `http://localhost:3000/api`

---

## 👥 ALUNOS

### 📋 **Listar todos os alunos**
```http
GET /api/students
```

**Response 200:**
```json
[
  {
    "id": "clx...",
    "name": "João Silva",
    "serie": "3º Ano EM B",
    "qrCode": "ABC123",
    "photo": "data:image/jpeg;base64,...",
    "hasVoucherToday": true,
    "createdAt": "2025-11-19T10:00:00.000Z",
    "updatedAt": "2025-11-19T10:00:00.000Z"
  }
]
```

---

### ➕ **Criar novo aluno**
```http
POST /api/students
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Maria Santos",
  "serie": "2º Ano EM A",
  "qrCode": "XYZ789",
  "photo": "data:image/jpeg;base64,..." // opcional
}
```

**Response 201:**
```json
{
  "id": "clx...",
  "name": "Maria Santos",
  "serie": "2º Ano EM A",
  "qrCode": "XYZ789",
  "photo": "data:image/jpeg;base64,...",
  "hasVoucherToday": true,
  "createdAt": "2025-11-19T10:00:00.000Z",
  "updatedAt": "2025-11-19T10:00:00.000Z"
}
```

**Error 409 (QR Code duplicado):**
```json
{
  "error": "QR Code já cadastrado"
}
```

---

### 🔍 **Buscar aluno por ID**
```http
GET /api/students/{id}
```

**Response 200:**
```json
{
  "id": "clx...",
  "name": "João Silva",
  "serie": "3º Ano EM B",
  "qrCode": "ABC123",
  "photo": "data:image/jpeg;base64,...",
  "hasVoucherToday": true,
  "createdAt": "2025-11-19T10:00:00.000Z",
  "updatedAt": "2025-11-19T10:00:00.000Z"
}
```

**Error 404:**
```json
{
  "error": "Aluno não encontrado"
}
```

---

### 🔍 **Buscar aluno por QR Code**
```http
GET /api/students/qrcode/{qrCode}
```

**Exemplo:**
```http
GET /api/students/qrcode/ABC123
```

**Response 200:**
```json
{
  "id": "clx...",
  "name": "João Silva",
  "serie": "3º Ano EM B",
  "qrCode": "ABC123",
  "photo": "data:image/jpeg;base64,...",
  "hasVoucherToday": true,
  "createdAt": "2025-11-19T10:00:00.000Z",
  "updatedAt": "2025-11-19T10:00:00.000Z"
}
```

---

### ✏️ **Atualizar aluno**
```http
PUT /api/students/{id}
Content-Type: application/json
```

**Body (campos opcionais):**
```json
{
  "name": "João Pedro Silva",
  "serie": "3º Ano EM C",
  "hasVoucherToday": false
}
```

**Response 200:**
```json
{
  "id": "clx...",
  "name": "João Pedro Silva",
  "serie": "3º Ano EM C",
  "qrCode": "ABC123",
  "photo": "data:image/jpeg;base64,...",
  "hasVoucherToday": false,
  "createdAt": "2025-11-19T10:00:00.000Z",
  "updatedAt": "2025-11-19T14:30:00.000Z"
}
```

---

### 🗑️ **Deletar aluno**
```http
DELETE /api/students/{id}
```

**Response 200:**
```json
{
  "message": "Aluno deletado com sucesso"
}
```

---

## 🎫 VALES

### ✅ **Usar vale do aluno**
```http
POST /api/students/{id}/use-voucher
```

**Response 200:**
```json
{
  "id": "clx...",
  "name": "João Silva",
  "serie": "3º Ano EM B",
  "qrCode": "ABC123",
  "photo": "data:image/jpeg;base64,...",
  "hasVoucherToday": false,
  "createdAt": "2025-11-19T10:00:00.000Z",
  "updatedAt": "2025-11-19T12:15:00.000Z"
}
```

**Error 400 (Vale já usado):**
```json
{
  "error": "Aluno já utilizou o vale hoje"
}
```

---

### 🎁 **Dar vale para todos**
```http
POST /api/vouchers/give-all
```

**Response 200:**
```json
{
  "message": "Vales dados para todos os alunos"
}
```

---

### 🚫 **Remover vale de todos**
```http
POST /api/vouchers/remove-all
```

**Response 200:**
```json
{
  "message": "Vales removidos de todos os alunos"
}
```

---

## 🔧 Exemplos de Uso no Frontend

### Fetch API:

```javascript
// Buscar todos os alunos
const response = await fetch('/api/students');
const students = await response.json();

// Criar aluno
const response = await fetch('/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Maria Santos',
    serie: '2º Ano EM A',
    qrCode: 'XYZ789'
  })
});

// Buscar por QR Code
const response = await fetch(`/api/students/qrcode/${qrCode}`);
const student = await response.json();

// Usar vale
const response = await fetch(`/api/students/${studentId}/use-voucher`, {
  method: 'POST'
});

// Dar vale para todos
const response = await fetch('/api/vouchers/give-all', {
  method: 'POST'
});
```

---

## 🚨 Códigos de Erro

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Dados inválidos |
| 404 | Não encontrado |
| 409 | Conflito (QR Code duplicado) |
| 500 | Erro interno do servidor |

---

## 📝 Notas

- Todas as rotas são **server-side** (Next.js API Routes)
- Credenciais do banco ficam **seguras** no `.env.local`
- O frontend pode chamar essas rotas diretamente com `fetch()`
- CORS não é necessário (mesmo domínio)
