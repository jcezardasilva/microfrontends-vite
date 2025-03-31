# Microfrontends com React e Vite

Este projeto demonstra como construir uma aplicação usando microfrontends com React e Vite. A arquitetura permite que diferentes partes da aplicação sejam desenvolvidas e implantadas independentemente.

## Estrutura do Projeto

O projeto é composto por:

- `host`: A aplicação principal que serve como container para os microfrontends
- `remote`: Um exemplo de microfrontend remoto que pode ser carregado dinamicamente

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Configuração do Projeto

### 1. Criar o Projeto Host

```bash
# Criar o projeto host
npm create vite@latest host-app --template react-ts

# Navegar para o diretório
cd host-app

# Instalar dependências
npm install

# Instalar dependências adicionais necessárias
npm install @originjs/vite-plugin-federation
```

### 2. Configurar o Vite no Host

Crie ou modifique o arquivo `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      remotes: {
        remote: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",

    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000
  }
})
```

### 3. Criar o Projeto Remote

```bash
# Criar o projeto remote
npm create vite@latest remote --template react-ts

# Navegar para o diretório
cd remote

# Instalar dependências
npm install

# Instalar dependências adicionais necessárias
npm install @originjs/vite-plugin-federation
```

### 4. Configurar o Vite no Remote

Crie ou modifique o arquivo `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.tsx',
        './App': './src/App.tsx'
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001
  }
})
```

### 5. Configure a porta no script de preview no Remote

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview --port 5001 --strictPort"
  },
```

### 6. Criar componente Button

Crie ou modifique o arquivo `src/components/Button.tsx`;

```typescript
const Button = ({ onClick }: { onClick: () => void }) => {
    return (
        <button type="submit" onClick={() => {
            onClick();
        }}>Click Me</button>
    );
};

export default Button;

```

### 7. Importar o componente Button

Na aplicação host-app modifique o arquivo `src/App.tsx`:

```typescript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from 'remote/Button' //importa o componente da aplicação remota
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)} />
        <p>Count is {count}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

## Executando

1. Inicie o servidor de desenvolvimento do host:
```bash
cd host-app
npm run dev
```

2. Construa o remote:
```bash
cd remote
npm run build
```

3. Execute o remote após a construção:
```bash
npm run preview
```

## Estrutura de Arquivos Recomendada

```
microfrontends-vite/
├── host-app/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── components/
│   ├── package.json
│   └── vite.config.ts
└── remote/
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── components/
    ├── package.json
    └── vite.config.ts
```

## Considerações Importantes

1. **Versionamento**: Mantenha as versões das dependências compartilhadas consistentes entre os projetos.
2. **Tipos**: Use TypeScript para melhor tipagem e manutenção do código.
3. **Estado**: Considere usar uma solução de gerenciamento de estado global (como Redux ou Zustand) para compartilhar estado entre os microfrontends.
4. **Estilização**: Use uma abordagem consistente para estilização (CSS Modules, Styled Components, etc.).

## Solução de Problemas

1. Se encontrar problemas de CORS, verifique se as URLs dos remotes estão corretas no `vite.config.ts`.
2. Certifique-se de que as portas não estão em uso por outros serviços.
3. Verifique se todas as dependências compartilhadas têm versões compatíveis.

## Recursos Adicionais

- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do React](https://reactjs.org/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
