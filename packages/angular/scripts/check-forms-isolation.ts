import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { exit } from 'node:process'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

const entryPoints = [
  { name: '@ark-ui/angular', file: 'src/index.ts' },
  { name: '@ark-ui/angular/avatar', file: 'avatar/public-api.ts' },
]

let failed = false
for (const { name, file } of entryPoints) {
  const source = readFileSync(join(root, file), 'utf-8')
  if (source.includes('@angular/forms')) {
    console.error(
      `${name} (${file}) imports from @angular/forms — forms is an optional peer and must not be required by non-form entry points.`,
    )
    failed = true
  }
}

if (failed) {
  exit(1)
}

console.log('forms isolation: ok')
