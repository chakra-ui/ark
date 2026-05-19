import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const privateEntrypoints = {
  '@ark-ui/angular/src/_zag': {
    exportKey: './src/_zag',
    fesm: 'ark-ui-angular-src-_zag.mjs',
    typesDir: join(dist, 'src/_zag'),
    typesFile: join(dist, 'src/_zag/index.d.ts'),
    typesSpecifierFile: join(dist, 'src/_zag/index.js'),
  },
  '@ark-ui/angular/src/internal': {
    exportKey: './src/internal',
    fesm: 'ark-ui-angular-src-internal.mjs',
    typesDir: join(dist, 'src/internal'),
    typesFile: join(dist, 'src/internal/index.d.ts'),
    typesSpecifierFile: join(dist, 'src/internal/index.js'),
  },
} as const

const toPosix = (path: string) => path.replaceAll('\\', '/')

const relativeSpecifier = (fromFile: string, targetFile: string) => {
  const specifier = toPosix(relative(dirname(fromFile), targetFile))
  return specifier.startsWith('.') ? specifier : `./${specifier}`
}

const walk = (dir: string): string[] => {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = join(dir, entry.name)
    return entry.isDirectory() ? walk(file) : [file]
  })
}

const packageJsonPath = join(dist, 'package.json')
if (!existsSync(packageJsonPath)) {
  throw new Error(`Build output package.json does not exist at ${packageJsonPath}`)
}

for (const [specifier, entrypoint] of Object.entries(privateEntrypoints)) {
  const fesmPath = join(dist, 'fesm2022', entrypoint.fesm)
  if (!existsSync(fesmPath)) {
    throw new Error(`Private build output for ${specifier} is missing at ${fesmPath}`)
  }
  if (!existsSync(entrypoint.typesFile)) {
    throw new Error(`Private type output for ${specifier} is missing at ${entrypoint.typesFile}`)
  }
}

const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
  exports?: Record<string, unknown>
}

for (const entrypoint of Object.values(privateEntrypoints)) {
  delete pkg.exports?.[entrypoint.exportKey]
}

writeFileSync(`${packageJsonPath}`, `${JSON.stringify(pkg, null, 2)}\n`)

for (const file of walk(join(dist, 'fesm2022')).filter((file) => file.endsWith('.mjs'))) {
  const original = readFileSync(file, 'utf-8')
  let source = original
  for (const [specifier, entrypoint] of Object.entries(privateEntrypoints)) {
    source = source.replaceAll(specifier, `./${entrypoint.fesm}`)
  }
  if (source !== original) {
    writeFileSync(file, source)
  }
}

for (const file of walk(dist).filter((file) => file.endsWith('.d.ts'))) {
  const original = readFileSync(file, 'utf-8')
  let source = original
  for (const [specifier, entrypoint] of Object.entries(privateEntrypoints)) {
    const sourceDir = dirname(file)
    if (
      file !== entrypoint.typesFile &&
      sourceDir !== entrypoint.typesDir &&
      !sourceDir.startsWith(`${entrypoint.typesDir}/`)
    ) {
      source = source.replaceAll(specifier, relativeSpecifier(file, entrypoint.typesSpecifierFile))
    }
  }
  if (source !== original) {
    writeFileSync(file, source)
  }
}
