import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { globbySync } from 'globby'
import path, { dirname } from 'path'
import { match } from 'ts-pattern'

const generateExports = (dirName: string) => {
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
  if (dirName !== 'anatomy') {
    exports['./factory'] = {
      types: './factory.d.ts',
      import: './factory.mjs',
      require: './factory.cjs',
    }
  }

  if (dirName === 'react') {
    exports['./portal'] = {
      types: './portal.d.ts',
      import: './portal.mjs',
      require: './portal.cjs',
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
  const packageName = process.argv.slice(2)[0]
  const dirName = packageName.split('/')[1]
  const root = dirname(findUpSync('pnpm-lock.yaml')!)

  process.chdir(
    match(dirName)
      .with('anatomy', () => path.join(root, 'packages', dirName))
      .otherwise(() => path.join(root, 'packages', 'frameworks', dirName)),
  )

  const packageJson = await fs.readJson('package.json')
  //  Note: At the time Solid does not support path imports like vue or react
  if (dirName !== 'solid') {
    packageJson.main = 'index.cjs'
    packageJson.module = 'index.mjs'
    packageJson.types = 'index.d.ts'
    packageJson.files = ['./']
    packageJson.exports = generateExports(dirName)
  }
  packageJson.keywords = generateKeywords()

  await fs.writeJson('dist/package.json', packageJson, { spaces: 2 })

  await fs.copy('README.md', 'dist/README.md')
  await fs.copy(path.join(root, 'LICENSE'), 'dist/LICENSE')
  await fs.copy('CHANGELOG.md', 'dist/CHANGELOG.md')
}

main()
