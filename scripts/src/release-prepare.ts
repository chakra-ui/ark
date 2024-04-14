import { basename, dirname, join, parse } from 'node:path'
import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { globby } from 'globby'
import { match } from 'ts-pattern'

/**
 * This script generates will update the package.json files of all frameworks and add the following:
 * - Keywords: The name of the components in the framework
 * - Exports: The exports of the framework
 */
const generateExports = async (pkgJsonPath: string) => {
  const paths = await globby(
    ['src/*/*/index.ts', 'src/index.ts', 'src/components/factory.{tsx,ts}'],
    {
      cwd: dirname(pkgJsonPath),
    },
  )
  return (
    paths
      .sort()
      .map((path) => {
        const { name, dir } = parse(path)
        const exportName = name === 'index' ? basename(dir) : name

        const key = match(exportName)
          .with('src', () => '.')
          .otherwise(() => `./${exportName}`)

        const slug = path.replace('src/', '').replace(/\.[^.]*$/, '')
        return {
          [key]: {
            source: `./src/${slug}.ts`,
            import: {
              types: `./dist/${slug}.d.ts`,
              default: `./dist/${slug}.js`,
            },
            require: {
              types: `./dist/${slug}.d.cts`,
              default: `./dist/${slug}.cjs`,
            },
          },
        }
      })
      .sort((a) => (Object.keys(a)[0] === '.' ? -1 : 1))
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      .reduce((acc, val) => ({ ...acc, ...val }), {})
  )
}

const generateKeywords = async (pkgJsonPath: string) => {
  const components = await globby([join(dirname(pkgJsonPath), 'src/components')], {
    onlyDirectories: true,
    deep: 1,
  })

  return components
    .map((component) => basename(component).replace('-', ' '))
    .filter((component) => !['presence', 'format', 'locale', 'environment'].includes(component))
    .sort()
}

const main = async () => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const root = dirname(findUpSync('bun.lockb')!)
  const packages = await globby([join(root, 'frameworks/*/package.json')])

  for (const pkg of packages) {
    console.log(`Updating keywords and exports for ${basename(dirname(pkg))}`)
    const packageJson = await fs.readJson(pkg)

    const keywords = await generateKeywords(pkg)
    const exports = await generateExports(pkg)

    packageJson.keywords = keywords
    packageJson.exports = pkg.includes('solid/package.json') ? packageJson.exports : exports

    await fs.writeJson(pkg, packageJson, { spaces: 2 })
  }
}

main()
