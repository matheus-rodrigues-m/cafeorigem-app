# Café Origem

> **Somos aroma e aconchego para os seus dias.**

Webapp mobile-first do Café Origem: um espaço digital para conhecer a cafeteria, explorar o cardápio e solicitar encomendas, reservas e adesão ao clube. A interface reúne essas experiências em uma aplicação de página única (SPA), com navegação fixa e contato contextual pelo WhatsApp.

## ✨ O que você encontra

| Tela | O que oferece |
| --- | --- |
| **Início** | Status de funcionamento, galeria de fotos, endereço, rotas para Google Maps e Waze, informações da atmosfera e divulgação do workshop sensorial. |
| **Cardápio** | Categorias, busca por nome e ingredientes, detalhes dos itens, sugestões de harmonização e preços em reais. |
| **Encomendas** | Catálogo de bolos e doces e formulário para escolher tamanho, data e horário de retirada. |
| **Espaço Prime** | Informações sobre os ambientes e formulário de pré-agendamento. |
| **Clube Origem** | Benefícios, planos mensal e anual e formulário de adesão. |

As solicitações são preparadas em mensagens com os dados preenchidos e encaminhadas ao WhatsApp comercial. O app não exige cadastro para navegar.

## 🧰 Tecnologias

- [React](https://react.dev/) 18 e [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) para desenvolvimento e build
- [Framer Motion](https://www.framer.com/motion/) para transições
- [Lucide](https://lucide.dev/) para ícones
- CSS próprio, com identidade visual em verde profundo, dourado e tons de creme

## 🚀 Comece por aqui

### Requisitos

- Node.js e npm instalados
- Um navegador moderno

### Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

### Ambiente de desenvolvimento

Inicie o servidor local:

```bash
npm run dev
```

Abra no navegador o endereço exibido pelo Vite — normalmente <http://localhost:5173>.

### Build de produção

Gere a versão otimizada para publicação:

```bash
npm run build
```

O comando verifica os tipos TypeScript e cria os arquivos de produção na pasta `dist/`.

### Pré-visualização do build

Depois de gerar o build, sirva a versão de produção localmente:

```bash
npm run preview
```

O Vite informará o endereço local da pré-visualização.

## 📦 Comandos npm

| Comando | Descrição |
| --- | --- |
| `npm install` | Instala as dependências do projeto. |
| `npm run dev` | Inicia o servidor de desenvolvimento com recarga automática. |
| `npm run build` | Executa a verificação de tipos e gera o build em `dist/`. |
| `npm run preview` | Pré-visualiza localmente o build de produção. |

## 🗂️ Organização do projeto

```text
.
├── public/
│   ├── favicon.png
│   └── img/                 # Fotos e logos usados pela interface
├── src/
│   ├── screens/             # Início, Cardápio, Encomendas, Prime e Clube
│   ├── App.tsx              # Navegação entre as telas
│   ├── data.ts              # Endereço, horários e dados das experiências
│   ├── menu.json            # Itens, preços, categorias e harmonizações
│   ├── ui.tsx               # Componentes compartilhados e formulários
│   ├── util.ts              # WhatsApp, formatação, busca e status
│   ├── index.css            # Estilos e tokens visuais
│   └── main.tsx             # Inicialização da aplicação
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📝 Conteúdo e configurações

- **Cardápio:** edite `src/menu.json`. Cada item associa uma categoria, nome, descrição, preço, imagem, tags e harmonizações. Preços com `est: true` são apresentados com `*` como valores de referência; `from: true` indica preço inicial.
- **Endereço, horários, workshop, encomendas, espaços e Clube Origem:** estão em `src/data.ts`. Os horários e dados de experiência são mantidos no próprio projeto e podem ser ajustados ali.
- **Contato pelo WhatsApp:** o número comercial e a criação dos links estão em `src/util.ts`. Os formulários montam a mensagem com as informações preenchidas.
- **Imagens:** coloque os arquivos em `public/img/`. A interface procura as imagens pelo nome usado nos dados, no formato `.jpg`.

## ℹ️ Observações

- Esta versão é uma aplicação front-end: não possui API, banco de dados, autenticação ou pagamento integrado.
- Encomendas, reservas e adesões são **solicitações** enviadas pelo WhatsApp e dependem de confirmação da equipe.
- Alguns preços são indicativos, conforme sinalizado na própria interface. Confirme valores, disponibilidade, endereço e horários com a cafeteria.
- O layout é otimizado para celular e mantém a navegação em um formato de aplicativo centralizado em telas maiores.
