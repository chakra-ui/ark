import { execFileSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('..', import.meta.url))
const run = (command, args) => execFileSync(command, args, { cwd, stdio: 'inherit' })

rmSync(new URL('../dist', import.meta.url), { recursive: true, force: true })

run('tsc', ['-p', 'tsconfig.build.json'])
run('node', ['scripts/manifest.mjs'])
run('node', ['scripts/cdn.mjs'])
