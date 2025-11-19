# ✅ CHECKLIST - SETUP PARA SEGUNDA-FEIRA

## 🎯 Objetivo
Conectar o sistema ao banco de dados existente.

---

## 📋 Passo a Passo

### ✅ **ANTES (já está pronto!)**

- [x] Next.js instalado e configurado
- [x] Prisma ORM instalado
- [x] API Routes criadas
- [x] Schema do banco definido
- [x] Sistema de login funcionando
- [x] Frontend completo (Scanner, Cadastro, Alunos)
- [x] Documentação criada

---

### 🔧 **NA SEGUNDA-FEIRA (você faz)**

#### 1. **Configurar Connection String** ⏱️ 2 minutos

- [ ] Abrir arquivo `.env.local`
- [ ] Adicionar sua connection string do banco:

```env
DATABASE_URL="postgresql://usuario:senha@host:5432/banco"
```

💡 **Dica:** Veja exemplos em [DATABASE_SETUP.md](./DATABASE_SETUP.md)

---

#### 2. **Configurar Provider do Prisma** ⏱️ 1 minuto

- [ ] Abrir `prisma/schema.prisma`
- [ ] Mudar linha 11 para seu tipo de banco:

```prisma
datasource db {
  provider = "postgresql"  # Mude para: "mysql", "postgresql" ou "sqlserver"
}
```

---

#### 3. **Sincronizar com o Banco** ⏱️ 2 minutos

**Se o banco JÁ tem dados:**

```bash
npm run db:pull       # Importa estrutura do banco
npm run db:generate   # Gera Prisma Client
```

**Se o banco está vazio:**

```bash
npm run db:push       # Cria as tabelas
```

---

#### 4. **Testar Conexão** ⏱️ 1 minuto

```bash
npm run dev
```

Abra no navegador:
- [ ] `http://localhost:3000/api/health` ← Deve mostrar "connected"

---

#### 5. **Fazer Login e Testar** ⏱️ 2 minutos

- [ ] Abrir `http://localhost:3000`
- [ ] Fazer login:
  - Email: `diogo.ueda@sesisp.org.br`
  - Senha: `Diogo@2025`
- [ ] Navegar para "Alunos" ← Deve listar os alunos do banco
- [ ] Testar Scanner QR Code

---

### 🎉 **PRONTO! Sistema funcionando!**

Total de tempo estimado: **8 minutos** ⏱️

---

## 🚨 Possíveis Problemas

### ❌ "Can't reach database server"

**Solução:**
- Verifique se o banco está rodando
- Confirme usuário e senha
- Teste a connection string direto no banco

---

### ❌ "Cannot find module '@prisma/client'"

**Solução:**
```bash
npm run db:generate
```

---

### ❌ Health check retorna erro

**Solução:**
1. Verifique `DATABASE_URL` no `.env.local`
2. Confirme se o provider está correto no `schema.prisma`
3. Rode `npm run db:generate` novamente

---

### ❌ Tabela não encontrada

**Solução:**
- Se banco existe: `npm run db:pull`
- Se banco vazio: `npm run db:push`

---

## 📞 Comandos de Emergência

```bash
# Ver erros detalhados
npm run dev

# Resetar tudo e começar de novo
npm run db:pull
npm run db:generate
npm run dev

# Ver dados no banco visualmente
npm run db:studio
```

---

## 📚 Documentação de Suporte

Se precisar de mais detalhes:

1. **[README.md](./README.md)** - Visão geral completa
2. **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Guia detalhado do banco
3. **[DATABASE_EXAMPLE.md](./DATABASE_EXAMPLE.md)** - Exemplos de SQL e dados
4. **[API_ROUTES.md](./API_ROUTES.md)** - Documentação da API
5. **[COMMANDS.md](./COMMANDS.md)** - Lista de comandos úteis

---

## ✨ O que você GANHA na segunda

✅ Sistema completo funcionando  
✅ Backend integrado no Next.js  
✅ API REST pronta  
✅ Dados sincronizados do banco  
✅ Interface responsiva  
✅ Scanner QR Code  
✅ Login seguro  
✅ Zero necessidade de criar backend separado!  

---

## 🎊 Está TUDO pronto!

Você só precisa:
1. Adicionar a connection string
2. Rodar 2 comandos
3. Testar!

**Total: ~8 minutos** e você tem um sistema full-stack rodando! 🚀

---

**Boa sorte na segunda-feira!** 💪
