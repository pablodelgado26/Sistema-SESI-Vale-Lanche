# 🚀 COMANDOS ÚTEIS DO BANCO DE DADOS

## 📦 Scripts NPM Disponíveis

### **Desenvolvimento**
```bash
npm run dev              # Inicia o servidor de desenvolvimento
```

### **Prisma Database**
```bash
npm run db:generate      # Gera o Prisma Client (rode após alterar schema)
npm run db:push          # Aplica mudanças do schema no banco (desenvolvimento)
npm run db:pull          # Importa estrutura do banco para o schema
npm run db:studio        # Abre interface visual do banco
```

---

## 🔧 Comandos Prisma Diretos

### **Sincronizar com banco existente**
```bash
npx prisma db pull
npx prisma generate
```

### **Criar migrations (produção)**
```bash
npx prisma migrate dev --name nome_da_migration
npx prisma migrate deploy  # Em produção
```

### **Resetar banco (⚠️ CUIDADO - apaga tudo!)**
```bash
npx prisma migrate reset
```

### **Abrir Prisma Studio (interface visual)**
```bash
npm run db:studio
# ou
npx prisma studio
```
Acesse: http://localhost:5555

---

## 🧪 Testar Conexão com o Banco

Depois de configurar o `DATABASE_URL`:

1. **Via browser:**
   ```
   http://localhost:3000/api/health
   ```

2. **Via terminal:**
   ```bash
   curl http://localhost:3000/api/health
   ```

**Resposta esperada se conectado:**
```json
{
  "status": "connected",
  "message": "Banco de dados conectado com sucesso!",
  "studentsCount": 150,
  "timestamp": "2025-11-19T10:00:00.000Z"
}
```

**Se houver erro:**
```json
{
  "status": "error",
  "message": "Erro ao conectar ao banco de dados",
  "error": "descrição do erro",
  "hint": "Verifique se DATABASE_URL está configurado no .env.local"
}
```

---

## 📊 Estrutura de Pastas do Prisma

```
prisma/
├── schema.prisma          # Schema do banco de dados
├── migrations/            # Histórico de migrations (se usar)
└── ...

src/
├── lib/
│   └── db.js             # Cliente Prisma configurado
└── app/
    └── api/              # API Routes do Next.js
        ├── students/     # CRUD de alunos
        ├── vouchers/     # Gerenciamento de vales
        └── health/       # Health check do banco
```

---

## 🔄 Workflow para Segunda-feira

1. **Adicionar connection string no `.env.local`**
   ```env
   DATABASE_URL="postgresql://usuario:senha@host:5432/banco"
   ```

2. **Verificar provider no `schema.prisma`**
   ```prisma
   datasource db {
     provider = "postgresql"  // ou "mysql" ou "sqlserver"
   }
   ```

3. **Importar estrutura do banco existente**
   ```bash
   npm run db:pull
   ```

4. **Gerar Prisma Client**
   ```bash
   npm run db:generate
   ```

5. **Testar conexão**
   ```bash
   npm run dev
   # Acesse: http://localhost:3000/api/health
   ```

6. **Ver dados no Prisma Studio** (opcional)
   ```bash
   npm run db:studio
   ```

---

## 🚨 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"
```bash
npm run db:generate
```

### Erro: "Can't reach database server"
- Verifique se o banco está rodando
- Confirme credenciais no `DATABASE_URL`
- Teste connection string direto no banco

### Erro: "Column not found"
```bash
npm run db:pull  # Reimporta estrutura
npm run db:generate
```

### Schema diferente do banco
1. Faça backup
2. Use `npm run db:pull` para sincronizar
3. Revise o `schema.prisma` gerado

---

## 📚 Links Úteis

- [Prisma Docs](https://www.prisma.io/docs)
- [Connection URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls)
- [Prisma Studio](https://www.prisma.io/docs/concepts/components/prisma-studio)
- [Migrate Guide](https://www.prisma.io/docs/concepts/components/prisma-migrate)
