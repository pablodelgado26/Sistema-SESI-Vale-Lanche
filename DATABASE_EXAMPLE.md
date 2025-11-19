# 📊 EXEMPLO DE ESTRUTURA DO BANCO

## 🗃️ Tabela: students

Se você precisar criar a tabela manualmente no seu banco, use este SQL como referência:

### PostgreSQL:
```sql
CREATE TABLE students (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    serie VARCHAR(255) NOT NULL,
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    photo TEXT,
    has_voucher_today BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qr_code ON students(qr_code);
CREATE INDEX idx_serie ON students(serie);
```

### MySQL:
```sql
CREATE TABLE students (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    serie VARCHAR(255) NOT NULL,
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    photo LONGTEXT,
    has_voucher_today BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_qr_code (qr_code),
    INDEX idx_serie (serie)
);
```

### SQL Server:
```sql
CREATE TABLE students (
    id NVARCHAR(255) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    serie NVARCHAR(255) NOT NULL,
    qr_code NVARCHAR(255) UNIQUE NOT NULL,
    photo NVARCHAR(MAX),
    has_voucher_today BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

CREATE INDEX idx_qr_code ON students(qr_code);
CREATE INDEX idx_serie ON students(serie);
```

---

## 📝 Exemplo de Dados

```sql
INSERT INTO students (id, name, serie, qr_code, photo, has_voucher_today) VALUES
('clx001', 'João Pedro Silva', '1º Ano A', 'QR001', NULL, TRUE),
('clx002', 'Maria Eduarda Santos', '2º Ano B', 'QR002', NULL, TRUE),
('clx003', 'Lucas Oliveira', '3º Ano EM C', 'QR003', NULL, FALSE),
('clx004', 'Ana Carolina Lima', '5º Ano D', 'QR004', NULL, TRUE);
```

---

## 🔄 Opções de Séries/Turmas

O sistema suporta estas opções:

**Ensino Fundamental I:**
- 1º Ano A, B, C, D
- 2º Ano A, B, C, D
- 3º Ano A, B, C, D
- 4º Ano A, B, C, D
- 5º Ano A, B, C, D

**Ensino Fundamental II:**
- 6º Ano A, B, C, D
- 7º Ano A, B, C, D
- 8º Ano A, B, C, D
- 9º Ano A, B, C, D

**Ensino Médio:**
- 1º Ano EM A, B, C, D
- 2º Ano EM A, B, C, D
- 3º Ano EM A, B, C, D

**Total: 60 opções**

---

## 📸 Campo Photo (Base64)

O campo `photo` armazena imagens em formato base64. Exemplo:

```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJ...
```

**Limites:**
- Tamanho máximo: 1MB
- Formatos: JPG, PNG
- Nullable: Pode ser NULL se não houver foto

---

## 🔍 Queries Úteis

### Contar total de alunos:
```sql
SELECT COUNT(*) FROM students;
```

### Alunos com vale disponível:
```sql
SELECT * FROM students WHERE has_voucher_today = TRUE;
```

### Buscar por série:
```sql
SELECT * FROM students WHERE serie LIKE '%3º Ano EM%';
```

### Buscar por QR Code:
```sql
SELECT * FROM students WHERE qr_code = 'QR001';
```

### Resetar vales (dar para todos):
```sql
UPDATE students SET has_voucher_today = TRUE;
```

### Remover vales (remover de todos):
```sql
UPDATE students SET has_voucher_today = FALSE;
```

---

## ⚙️ Configuração de Connection String

### PostgreSQL:
```
postgresql://usuario:senha@localhost:5432/sesi_valelanche
```

### MySQL:
```
mysql://usuario:senha@localhost:3306/sesi_valelanche
```

### SQL Server:
```
sqlserver://localhost:1433;database=sesi_valelanche;user=usuario;password=senha;encrypt=true
```

---

## 🚀 Próximos Passos na Segunda

1. **Se o banco JÁ EXISTE e está POPULADO:**
   ```bash
   # 1. Configure DATABASE_URL no .env.local
   # 2. Rode:
   npm run db:pull      # Importa estrutura
   npm run db:generate  # Gera client
   npm run dev          # Inicia o sistema
   ```

2. **Se o banco está VAZIO:**
   ```bash
   # 1. Configure DATABASE_URL no .env.local
   # 2. Rode:
   npm run db:push      # Cria as tabelas
   npm run dev          # Inicia o sistema
   ```

3. **Para CRIAR dados de teste:**
   - Use Prisma Studio: `npm run db:studio`
   - Ou use a interface de Cadastro do sistema
   - Ou insira via SQL (exemplos acima)

---

## 📊 Prisma Studio (Interface Visual)

Abra uma interface visual para ver/editar dados:

```bash
npm run db:studio
```

Acesse: http://localhost:5555

**Você pode:**
- ✅ Ver todos os alunos
- ✅ Criar/editar/deletar registros
- ✅ Filtrar e buscar
- ✅ Não precisa escrever SQL!

---

## ✅ Checklist para Segunda

- [ ] Adicionar `DATABASE_URL` no `.env.local`
- [ ] Alterar `provider` no `prisma/schema.prisma` se necessário
- [ ] Rodar `npm run db:pull` (se banco existente)
- [ ] Rodar `npm run db:generate`
- [ ] Testar com `npm run dev`
- [ ] Verificar conexão em `http://localhost:3000/api/health`
- [ ] (Opcional) Abrir Prisma Studio: `npm run db:studio`

**Está tudo pronto para você!** 🎉
