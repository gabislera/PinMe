
<img width="1510" alt="Captura de Tela 2025-05-18 às 21 40 32" src="https://github.com/user-attachments/assets/78024a3b-c9a2-424a-9855-5ac3b86c5ce2" />

# PinMe

PinMe é uma aplicação web desenvolvida com React, TypeScript e Vite, que permite o cadastro, visualização e gerenciamento de contatos em um mapa interativo do Google Maps. Cada contato possui informações detalhadas, incluindo endereço geolocalizado, CPF, telefone e email. O sistema oferece autenticação, edição de contatos, busca automática de endereço via CEP e configurações de conta.

## Funcionalidades

- Cadastro, edição e exclusão de contatos com validação de CPF, telefone e email.
- Visualização dos contatos em um mapa interativo (Google Maps).
- Busca automática de endereço pelo CEP (ViaCEP).
- Autenticação de usuário.
- Alteração de senha e exclusão de conta.
- Interface responsiva e tema escuro/claro.
- Feedback visual com toasts para ações do usuário.

## Tecnologias utilizadas

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)


## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

Clone o repositório:

```bash
git clone https://github.com/gabislera/PinMe.git
cd pinme
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
VITE_GOOGLE_API_KEY=your_google_maps_api_key
```

- Substitua `your_google_maps_api_key` pela sua chave da API do Google Maps.
- Para obter uma chave, acesse: [Google Cloud Console](https://console.cloud.google.com/).

## Execução

Para rodar o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Estrutura do Projeto

```
src/
  components/      # Componentes reutilizáveis (Map, Input, Button, etc)
  context/         # Contextos globais (Auth, Theme, Contacts, Toast)
  hooks/           # Hooks customizados
  layouts/         # Layouts de páginas
  pages/           # Páginas principais (home, settings, etc)
  repositories/    # Lógica de acesso a dados
  routes/          # Definição de rotas
  services/        # Serviços externos
  utils/           # Utilitários e helpers
public/            # Arquivos estáticos
```

## Variáveis de Ambiente

- `VITE_GOOGLE_API_KEY`: Chave da API do Google Maps (obrigatória para funcionamento do mapa e geolocalização).

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
