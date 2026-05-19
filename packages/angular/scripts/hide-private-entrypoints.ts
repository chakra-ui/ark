import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const privateEntrypoints = {
  '@ark-ui/angular/src/_zag': {
    exportKey: './src/_zag',
    fesm: 'ark-ui-angular-src-_zag.mjs',
    typesDir: join(dist, 'src/_zag'),
  },
  '@ark-ui/angular/src/internal': {
    exportKey: './src/internal',
    fesm: 'ark-ui-angular-src-internal.mjs',
    typesDir: join(dist, 'src/internal'),
  },
} as const

const toPosix = (path: string) => path.replaceAll('\\', '/')

const relativeSpecifier = (fromFile: string, targetDir: string) => {
  const specifier = toPosix(relative(dirname(fromFile), targetDir))
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
  const typesPath = join(entrypoint.typesDir, 'index.d.ts')
  if (!existsSync(fesmPath)) {
    throw new Error(`Private build output for ${specifier} is missing at ${fesmPath}`)
  }
  if (!existsSync(typesPath)) {
    throw new Error(`Private type output for ${specifier} is missing at ${typesPath}`)
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
  let source = readFileSync(file, 'utf-8')
  for (const [specifier, entrypoint] of Object.entries(privateEntrypoints)) {
    source = source.replaceAll(specifier, `./${entrypoint.fesm}`)
  }
  writeFileSync(file, source)
}

for (const file of walk(dist).filter((file) => file.endsWith('.d.ts'))) {
  let source = readFileSync(file, 'utf-8')
  for (const [specifier, entrypoint] of Object.entries(privateEntrypoints)) {
    source = source.replaceAll(specifier, relativeSpecifier(file, entrypoint.typesDir))
  }
  writeFileSync(file, source)
}
