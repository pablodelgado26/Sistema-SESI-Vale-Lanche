# 🗄️ GUIA DE CONFIGURAÇÃO DO BANCO DE DADOS

## 📋 Passo a Passo para Segunda-feira

### 1. **Adicionar Connection String no `.env.local`**

Abra o arquivo `.env.local` e adicione sua connection string do banco:

#### MySQL:
```env
DATABASE_URL="mysql://usuario:senha@host:3306/nome_banco"
```

#### PostgreSQL:
```env
DATABASE_URL="postgresql://usuario:senha@host:5432/nome_banco"
```

#### SQL Server:
```env
DATABASE_URL="sqlserver://host:1433;database=nome_banco;user=usuario;password=senha;encrypt=true"
```

---

### 2. **Alterar Provider no Prisma Schema**

Abra o arquivo `prisma/schema.prisma` e altere o `provider` na linha 11:

```prisma
datasource db {
  provider = "mysql"  // Mude para: "mysql", "postgresql" ou "sqlserver"
}
```

---

### 3. **Sincronizar com o Banco Existente**

Se o banco já está populado, rode este comando para o Prisma reconhecer as tabelas:

```bash
npx prisma db pull
```

Isso vai atualizar o `schema.prisma` com as tabelas existentes.

---

### 4. **Gerar o Prisma Client**

Depois de configurar, gere o cliente:

```bash
npx prisma generate
```

---

### 5. **Testar a Conexão**

Rode o projeto e teste:

```bash
npm run dev
```

Acesse: `http://localhost:3000`

---

## 📊 Estrutura Esperada do Banco

O sistema espera uma tabela chamada `students` com estas colunas:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | String/UUID | ID único do aluno |
| `name` | String | Nome completo |
| `serie` | String | Série/turma (ex: "3º Ano EM B") |
| `qrCode` | String (UNIQUE) | Código QR único |
| `photo` | Text (nullable) | Foto em base64 |
| `hasVoucherToday` | Boolean | Se tem vale disponível hoje |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

---

## 🔄 Se o Banco NÃO Existir

Se você ainda não criou o banco, rode:

```bash
npx prisma migrate dev --name init
```

Isso vai criar as tabelas automaticamente!

---

## 🚨 Solução de Problemas

### Erro de conexão?
- Verifique se o banco está rodando
- Confirme usuário/senha
- Teste a connection string diretamente no banco

### Tabelas diferentes?
- Use `npx prisma db pull` para importar a estrutura
- Ajuste o `schema.prisma` manualmente se necessário

---

## 📞 Suporte

Se tiver dúvidas na segunda, consulte:
- Documentação Prisma: https://www.prisma.io/docs
- Este arquivo: `DATABASE_SETUP.md`
