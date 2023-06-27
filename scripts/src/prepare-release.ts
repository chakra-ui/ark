import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { globbySync } from 'globby'
import path, { dirname } from 'path'

const generateExports = () => {
  const paths = globbySync('src/**/index.ts')
  const exports: Record<string, unknown> = {}

  for (const p of paths) {
    const keyPath = p.replace('src', '.').replace('/index.ts', '')
    exports[keyPath] = {
      types: `${keyPath}/index.d.ts`,
      import: `${keyPath}/index.mjs`,
      require: `${keyPath}/index.cjs`,
    }
  }
  exports['./package.json'] = './package.json'
  return exports
}

const generateKeywords = () =>
  globbySync(['src'], { onlyDirectories: true, deep: 1 })
    .map((component) => component.replace('src/', ''))
    .map((component) => component.replace('-', ' '))

const main = async () => {
  const pakcageName = process.argv.slice(2)[0]
  const framework = pakcageName.split('/')[1]

  const root = dirname(findUpSync('pnpm-lock.yaml')!)
  process.chdir(path.join(root, 'packages', framework))

  const packageJson = await fs.readJson('package.json')
  packageJson.main = 'index.cjs'
  packageJson.module = 'index.mjs'
  packageJson.types = 'index.d.ts'
  packageJson.files = ['./']
  packageJson.exports = generateExports()
  packageJson.keywords = generateKeywords()

  await fs.writeJson('dist/package.json', packageJson, { spaces: 2 })

  await fs.copy('README.md', 'dist/README.md')
  await fs.copy(path.join(root, 'LICENSE'), 'dist/LICENSE')
  await fs.copy('CHANGELOG.md', 'dist/CHANGELOG.md')
}

main()
