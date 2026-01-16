import sdk from '@stackblitz/sdk'

const tsconfig = {
  files: [],
  references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
}

const tsconfigApp = {
  extends: '@tsconfig/svelte/tsconfig.json',
  compilerOptions: {
    target: 'ES2022',
    useDefineForClassFields: true,
    module: 'ESNext',
    resolveJsonModule: true,
    allowJs: true,
    checkJs: true,
    isolatedModules: true,
    moduleDetection: 'force',
  },
  include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.svelte'],
}

const tsconfigNode = {
  compilerOptions: {
    tsBuildInfoFile: './node_modules/.tmp/tsconfig.node.tsbuildinfo',
    target: 'ES2023',
    lib: ['ES2023'],
    module: 'ESNext',
    skipLibCheck: true,

    moduleResolution: 'bundler',
    allowImportingTsExtensions: true,
    verbatimModuleSyntax: true,
    moduleDetection: 'force',
    noEmit: true,

    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    erasableSyntaxOnly: true,
    noFallthroughCasesInSwitch: true,
    noUncheckedSideEffectImports: true,
  },
  include: ['vite.config.ts'],
}

const packageJson = {
  name: 'ark-ui-svelte',
  private: true,
  version: '0.0.0',
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview',
    check: 'svelte-check --tsconfig ./tsconfig.app.json && tsc -p tsconfig.node.json',
  },
  dependencies: {
    '@ark-ui/svelte': 'latest',
    'lucide-svelte': 'latest',
  },
  devDependencies: {
    '@sveltejs/vite-plugin-svelte': '^5',
    '@tsconfig/svelte': '^5',
    svelte: '^5',
    'svelte-check': '^4',
    typescript: '^5',
    vite: '^7.0.0-beta.1',
  },
}

const viteConfig = `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
})`

const svelteConfig = `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess(),
}`

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ark UI  / Svelte</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`

const main = `import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app`

const appDts = `/// <reference types="svelte" />
/// <reference types="vite/client" />

export {};`

function transformCssModuleImports(code: string): string {
  return code.replace(/from\s+['"]styles\/([^'"]+)['"]/g, "from './$1'")
}

function generateAppCss(cssModules: Record<string, string>): string {
  const theme = cssModules['theme.css'] ?? ''
  const utilities = cssModules['utilities.css'] ?? ''
  return `${theme}\n\n${utilities}`
}

export async function openInStackblitzSvelte(opts: {
  code: string
  cssModules: Record<string, string>
  id: string
  component: string
}) {
  let { code, cssModules, id, component } = opts

  code = transformCssModuleImports(code)

  const files: Record<string, string> = {
    'tsconfig.json': JSON.stringify(tsconfig, null, 2),
    'tsconfig.app.json': JSON.stringify(tsconfigApp, null, 2),
    'tsconfig.node.json': JSON.stringify(tsconfigNode, null, 2),
    'package.json': JSON.stringify(packageJson, null, 2),
    'vite.config.ts': viteConfig,
    'svelte.config.js': svelteConfig,
    'index.html': indexHtml,
    'src/App.svelte': code,
    'src/app.css': generateAppCss(cssModules),
    'src/main.ts': main,
    'src/app.d.ts': appDts,
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
      openFile: 'src/App.svelte',
      showSidebar: false,
    },
  )
}
