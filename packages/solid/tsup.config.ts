import { readFile } from 'node:fs/promises'
import { transformAsync } from '@babel/core'
import typescript from '@babel/preset-typescript'
import solid from '@solidjs/babel-plugin'
import type { Plugin } from 'esbuild'
import { type Options, defineConfig } from 'tsup'

// compiles JSX to Solid 2 DOM output, the way @solidjs/vite-plugin does for the client
const solidPlugin = (): Plugin => ({
  name: 'solid',
  setup(build) {
    build.onLoad({ filter: /\.tsx$/ }, async ({ path }) => {
      const source = await readFile(path, 'utf8')
      const result = await transformAsync(source, {
        filename: path,
        babelrc: false,
        configFile: false,
        presets: [[typescript, { onlyRemoveTypeImports: true }]],
        plugins: [[solid, { generate: 'dom', hydratable: false }]],
      })
      return { contents: result?.code ?? '', loader: 'js' }
    })
  },
})

function generateConfig(jsx: boolean): Options {
  return {
    target: 'esnext',
    platform: 'browser',
    format: 'esm',
    clean: true,
    dts: !jsx,
    entry: [
      'src/index.tsx',
      'src/components/anatomy.ts',
      'src/components/collection.ts',
      'src/components/factory.tsx',
      'src/**/*/index.tsx',
    ],
    outDir: 'dist/',
    treeshake: { preset: 'smallest' },
    replaceNodeEnv: true,
    esbuildOptions(options) {
      if (jsx) {
        options.jsx = 'preserve'
      }
      options.chunkNames = '[name]/[hash]'
      options.drop = ['console', 'debugger']
    },
    outExtension() {
      return jsx ? { js: '.jsx' } : {}
    },
    esbuildPlugins: !jsx ? [solidPlugin()] : [],
  }
}

export default defineConfig([generateConfig(false), generateConfig(true)])
