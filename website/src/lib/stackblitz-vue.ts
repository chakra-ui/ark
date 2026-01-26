import sdk from '@stackblitz/sdk'

const tsconfigApp = {
  extends: '@vue/tsconfig/tsconfig.dom.json',
  compilerOptions: {
    tsBuildInfoFile: './node_modules/.tmp/tsconfig.app.tsbuildinfo',
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    erasableSyntaxOnly: true,
    noFallthroughCasesInSwitch: true,
    noUncheckedSideEffectImports: true,
  },
  include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
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

const tsconfig = {
  files: [],
  references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
}

const packageJson = {
  name: 'ark-ui-vue',
  private: true,
  version: '0.0.0',
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'vue-tsc -b && vite build',
    preview: 'vite preview',
  },
  dependencies: {
    vue: 'latest',
    '@ark-ui/vue': 'latest',
    'lucide-vue-next': 'latest',
  },
  devDependencies: {
    '@vitejs/plugin-vue': '^5.2.4',
    '@vue/tsconfig': '^0.7.0',
    typescript: '~5.8.3',
    vite: '^6.3.5',
    'vue-tsc': '^2.2.10',
  },
}

const viteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})`

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`

const main = `import { createApp } from 'vue'
import './global.css'
import App from './App.vue'

createApp(App).mount('#app')`

const viteEnv = `/// <reference types="vite/client" />`

function transformCssModuleImports(code: string): string {
  return code.replace(/from\s+['"]styles\/[^'"]+\.module\.css['"]/g, "from './index.module.css'")
}

function generateGlobalCss(cssModules: Record<string, string>): string {
  const theme = cssModules['theme.css'] ?? ''
  const utilities = cssModules['utilities.css'] ?? ''
  const global = (cssModules['global.css'] ?? '').replace(/#root(?![\w-])/g, '#app')
  return [theme, utilities, global].filter(Boolean).join('\n\n')
}

export async function openInStackblitzVue(opts: {
  code: string
  cssModules: Record<string, string>
  id: string
  component: string
}) {
  let { code, cssModules, id, component } = opts

  code = transformCssModuleImports(code)

  const files: Record<string, string> = {
    'tsconfig.app.json': JSON.stringify(tsconfigApp, null, 2),
    'tsconfig.node.json': JSON.stringify(tsconfigNode, null, 2),
    'tsconfig.json': JSON.stringify(tsconfig, null, 2),
    'package.json': JSON.stringify(packageJson, null, 2),
    'vite.config.ts': viteConfig,
    'index.html': indexHtml,
    'src/App.vue': code,
    'src/global.css': generateGlobalCss(cssModules),
    'src/main.ts': main,
    'src/vite-env.d.ts': viteEnv,
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
      openFile: 'src/App.vue',
      showSidebar: false,
    },
  )
}
