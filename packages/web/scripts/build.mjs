import { execFileSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('..', import.meta.url))

// Remove obsolete outputs so renamed components cannot leak into the archive.
rmSync(new URL('../dist', import.meta.url), { recursive: true, force: true })
execFileSync('tsc', ['-p', 'tsconfig.build.json'], { cwd, stdio: 'inherit' })
