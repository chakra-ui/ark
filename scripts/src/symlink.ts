import { findPackages } from 'find-packages'
import { findUpSync } from 'find-up'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

async function getZagPackages(): Promise<Record<string, string>> {
  const lockFilePath = findUpSync('bun.lockb')
  if (!lockFilePath) throw new ReferenceError('bun.lockb not found')

  const rootDir = dirname(lockFilePath)

  const dir = findUpSync('zag', { type: 'directory' })
  if (!dir) throw new ReferenceError('zag directory not found')

  const packages = await findPackages(dir, {
    includeRoot: false,
    patterns: ['packages/**/*', 'shared/*'],
  })

  const result: Record<string, string> = {}

  for (const { manifest, dir } of packages) {
    if (!manifest.name) continue
    result[manifest.name] = relative(rootDir, dir)
  }

  return result
}

async function main() {
  const overrides = await getZagPackages()

  const revert = process.argv.includes('--revert')
  const lockFilePath = resolve('../bun.lockb')

  const packageJson = JSON.parse(readFileSync('../package.json', 'utf-8'))

  if (revert) {
    spawnSync('rm', ['-rf', '../bun.lockb'], { stdio: 'inherit' })

    if (!packageJson.overrides) return

    for (const key of Object.keys(overrides)) {
      delete packageJson.overrides[key]
    }

    if (Object.keys(packageJson.overrides).length === 0) {
      packageJson.overrides = undefined
    }

    writeFileSync('../package.json', JSON.stringify(packageJson, null, 2))

    const oldLockFilePath = resolve('../bun.lockb.copy')
    spawnSync('mv', [oldLockFilePath, lockFilePath], { stdio: 'inherit' })

    //
  } else {
    packageJson.overrides ||= {}
    Object.assign(packageJson.overrides, overrides)

    writeFileSync('../package.json', JSON.stringify(packageJson, null, 2))
    spawnSync('cp', [lockFilePath, `${lockFilePath}.copy`], { stdio: 'inherit' })
  }

  spawnSync('bun', ['install'], { stdio: 'inherit' })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
