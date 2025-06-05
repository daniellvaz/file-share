
# 🗂️ FilesShare

Compartilhe documentos com facilidade.  
Aplicação simples para upload de arquivos, onde um link único é gerado automaticamente após o envio, e copiado para a área de transferência.

![Preview da interface](./imagem_2025-06-05_172750862.png)

---

## 🚀 Tecnologias utilizadas

- [Fastify](https://fastify.dev/) – Backend com `@fastify/multipart`
- [Prisma](https://www.prisma.io/) – ORM para persistência
- [TailwindCSS](https://tailwindcss.com/) – Estilização moderna
- JavaScript Puro – Envio dos arquivos e manipulação do DOM

---

## 📁 Funcionalidades

- Upload de múltiplos arquivos
- Geração de link único para download em `.zip`
- Cópia automática do link para a área de transferência
- UI responsiva e moderna com TailwindCSS

---

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/files-share.git
   cd files-share
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o Prisma**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Inicie o servidor**
   ```bash
   npm run dev
   ```

---

## 🌐 Frontend

A aplicação frontend está no arquivo `index.html`. Para visualizar localmente:

```bash
open index.html
```

---

## 🔗 Exemplo de resposta do backend

```json
{
  "id": "a5cvvcrovfv72gwouzndwaq6",
  "url": "http://localhost:3333/download/a5cvvcrovfv72gwouzndwaq6",
  "createdAt": "2025-06-05T20:07:42.164Z",
  "updatedAt": "2025-06-05T20:07:42.164Z"
}
```

---

## 📋 TODO

- [ ] Página para visualizar histórico de uploads
- [ ] Autenticação de usuários
- [ ] Expiração automática de arquivos antigos
- [ ] Deploy com Docker + Vercel/Render

---

## 📝 Licença

MIT © Daniel Murilo Vaz
