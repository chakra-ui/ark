import sdk from '@stackblitz/sdk'

const tsconfig = {
  compilerOptions: {
    target: 'ES2020',
    useDefineForClassFields: true,
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    module: 'ESNext',
    skipLibCheck: true,
    moduleResolution: 'bundler',
    allowImportingTsExtensions: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: 'react-jsx',
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
  },
  include: ['src'],
}

const packageJson = {
  name: 'ark-ui-react',
  private: true,
  version: '0.0.0',
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview',
  },
  dependencies: {
    react: 'latest',
    'react-dom': 'latest',
    '@ark-ui/react': '5',
    'lucide-react': 'latest',
    'react-shadow': 'latest',
  },
  devDependencies: {
    '@types/react': 'latest',
    '@types/react-dom': 'latest',
    '@vitejs/plugin-react': '^4.3.0',
    typescript: '^5.2.2',
    vite: '^5.2.11',
  },
}

const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
})`

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`

const main = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`

function transformCssModuleImports(code: string): string {
  return code.replace(/from\s+['"]styles\/([^'"]+)['"]/g, "from './$1'")
}

function generateIndexCss(cssModules: Record<string, string>): string {
  const theme = cssModules['theme.css'] ?? ''
  const utilities = cssModules['utilities.css'] ?? ''
  return `${theme}\n\n${utilities}`
}

export async function openInStackblitzReact(opts: {
  code: string
  cssModules: Record<string, string>
  id: string
  component: string
}) {
  let { code, cssModules, id, component } = opts

  code = code.replace(/export const \w+ =/, 'export const App =')
  code = transformCssModuleImports(code)

  const files: Record<string, string> = {
    'tsconfig.json': JSON.stringify(tsconfig, null, 2),
    'package.json': JSON.stringify(packageJson, null, 2),
    'vite.config.ts': viteConfig,
    'index.html': indexHtml,
    'src/App.tsx': code,
    'src/index.css': generateIndexCss(cssModules),
    'src/main.tsx': main,
  }

  for (const [filename, content] of Object.entries(cssModules)) {
    if (filename.endsWith('.module.css')) {
      files[`src/${filename}`] = content
    }
  }

  sdk.openProject(
    {
      title: `Ark UI / ${component} / ${id}`,
      description: `${component} component demo from ark-ui.com`,
      template: 'node',
      files,
    },
    {
      openFile: 'src/App.tsx',
      showSidebar: false,
    },
  )
}
