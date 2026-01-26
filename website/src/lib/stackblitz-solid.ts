import sdk from '@stackblitz/sdk'

const tsconfig = {
  compilerOptions: {
    strict: true,
    target: 'ESNext',
    module: 'ESNext',
    moduleResolution: 'node',
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: 'preserve',
    jsxImportSource: 'solid-js',
    types: ['vite/client'],
    noEmit: true,
    isolatedModules: true,
  },
}

const packageJson = {
  name: 'ark-ui-solid',
  version: '0.0.0',
  description: '',
  scripts: {
    start: 'vite',
    dev: 'vite',
    build: 'vite build',
    serve: 'vite preview',
  },
  license: 'MIT',
  devDependencies: {
    typescript: '^5.1.3',
    vite: '^4.3.9',
    'vite-plugin-solid': '^2.7.0',
  },
  dependencies: {
    'solid-js': 'latest',
    'lucide-solid': 'latest',
    '@ark-ui/solid': 'latest',
  },
}

const viteConfig = `import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});`

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="shortcut icon" type="image/ico" href="/src/assets/favicon.ico" />
    <title>Solid App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="/src/index.tsx" type="module"></script>
  </body>
</html>
`

const main = `/* @refresh reload */
import { render } from 'solid-js/web'
import { App } from './App'
import './global.css'

render(() => <App />, document.getElementById('root')!)`

function transformCssModuleImports(code: string): string {
  return code.replace(/from\s+['"]styles\/[^'"]+\.module\.css['"]/g, "from './index.module.css'")
}

function generateGlobalCss(cssModules: Record<string, string>): string {
  const theme = cssModules['theme.css'] ?? ''
  const utilities = cssModules['utilities.css'] ?? ''
  const global = cssModules['global.css'] ?? ''
  return [theme, utilities, global].filter(Boolean).join('\n\n')
}

export async function openInStackblitzSolid(opts: {
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
    'src/global.css': generateGlobalCss(cssModules),
    'src/index.tsx': main,
  }

  const componentCss = Object.entries(cssModules)
    .filter(([filename]) => filename.endsWith('.module.css'))
    .map(([, content]) => content)
    .join('\n\n')

  if (componentCss) {
    files['src/index.module.css'] = componentCss
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
