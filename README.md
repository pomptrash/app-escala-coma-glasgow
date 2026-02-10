# App Escala de Glasgow

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white)

Este aplicativo mobile foi desenvolvido para auxiliar profissionais de saúde na avaliação do nível de consciência de pacientes, utilizando a Escala de Coma de Glasgow. O foco principal do projeto foi criar uma ferramenta rápida, intuitiva e totalmente funcional em ambientes offline.

## 🛠️ Tecnologias e Arquitetura

- **Framework**: React Native com Expo (SDK 54).
- **Interface de Usuário**: `React-Native-Paper` para componentes de design.
- **Navegação**: `React-Navigation` (Stack) para transição entre telas.
- **Persistência de Dados**: `Async-Storage` para salvar registros de pacientes offline.
- **Formulários**: `React-Hook-Form` para gestão eficiente e validação de entradas.
- **Build Nativa**: Configurado via EAS (Expo Application Services) para geração de APK independente.

## 🚀 Funcionalidades Principais

- **Cálculo de Coma de Glasgow**: Interface simplificada para soma dos parâmetros oculares, verbais e motores.
- **Armazenamento Local**: Os dados são salvos no dispositivo, permitindo o uso em ambientes sem internet.
- **Suporte a Temas**: Alternância entre Light e Dark Mode para melhor conforto visual em plantões noturnos.

## 🛠️ Como Executar o Projeto

- **Clone o repositório:** git clone https://github.com/pomptrash/app-escala-coma-glasgow

- **Instale as dependências:** npm install

- **Inicie o projeto:** npx expo start

## 📁 Estrutura do Projeto

```
├── 📁 assets
│   ├── 🖼️ adaptive-icon.png
│   ├── 🖼️ favicon.png
│   ├── 🖼️ icon.png
│   └── 🖼️ splash-icon.png
├── 📁 src
│   ├── 📁 components
│   │   ├── 📄 PatientCard.js
│   │   └── 📄 PatientModal.js
│   ├── 📁 contexts
│   │   ├── 📄 patientContext.js
│   │   └── 📄 themeContext.js
│   ├── 📁 routes
│   │   ├── 📄 index.js
│   │   └── 📄 stack.router.js
│   ├── 📁 screens
│   │   ├── 📁 GlasgowForm
│   │   │   └── 📄 index.js
│   │   ├── 📁 GlasgowFormResult
│   │   │   └── 📄 index.js
│   │   ├── 📁 Home
│   │   │   └── 📄 index.js
│   │   └── 📁 PatientDetails
│   │       └── 📄 index.js
│   └── 📁 storage
│       └── 📄 patientStorage.js
├── ⚙️ .gitignore
├── 📄 App.js
├── 📝 README.md
├── ⚙️ app.json
├── ⚙️ eas.json
├── 📄 index.js
├── ⚙️ package-lock.json
└── ⚙️ package.json
```

## 📸 Screenshots

<p align="center">
    <img src="./assets/screenshots/1. home .jpg" width="30%" alt="Tela Inicial" />
    <img src="./assets/screenshots/2. glasgow form.jpg" width="30%" alt="Formulário" />
    <img src="./assets/screenshots/2.1 glasgow form.jpg" width="30%" alt="Formulário" />
    <img src="./assets/screenshots/3. glasgow form result.jpg" width="30%" alt="Resultado do Cálculo" />
    <img src="./assets/screenshots/3.1 glasgow form result.jpg" width="30%" alt="Resultado do Cálculo" />
    <img src="./assets/screenshots/4. patient details.jpg" width="30%" alt="Detalhes do paciente" />
    <img src="./assets/screenshots/5. add or edit patient modal.jpg" width="30%" alt="Modal de criação/edição do paciente" />
</p>
