import { solidPlugin } from 'esbuild-plugin-solid'
import { type Options, defineConfig } from 'tsup'

function generateConfig(jsx: boolean): Options {
  return {
    target: 'esnext',
    platform: 'browser',
    format: 'esm',
    clean: true,
    dts: !jsx,
    entry: [
      'src/index.tsx',
      'src/components/factory.tsx',
      'src/components/collection.ts',
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
    // @ts-ignore
    esbuildPlugins: !jsx ? [solidPlugin({ solid: { generate: 'dom' } })] : [],
  }
}

export default defineConfig([generateConfig(false), generateConfig(true)])
