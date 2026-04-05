import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { findPackages } from 'find-packages'
import { findUpSync } from 'find-up'

function getRootDir(): string {
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const lockFilePath = findUpSync('bun.lock', { cwd: scriptDir })
  if (!lockFilePath) throw new ReferenceError('bun.lock not found')
  return dirname(lockFilePath)
}

async function getZagPackages(rootDir: string): Promise<Record<string, string>> {
  const zagDir = findUpSync('zag', { cwd: rootDir, type: 'directory' })
  if (!zagDir) {
    throw new ReferenceError('zag directory not found (look for a sibling checkout next to this repo, e.g. ../zag)')
  }

  const packages = await findPackages(zagDir, {
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

function removeNodeModulesDirs(rootDir: string) {
  const dirs: string[] = [join(rootDir, 'node_modules')]

  const pushWorkspaceSubdirs = (segment: string) => {
    const base = join(rootDir, segment)
    if (!existsSync(base)) return
    for (const name of readdirSync(base)) {
      const path = join(base, name, 'node_modules')
      if (existsSync(path)) dirs.push(path)
    }
  }

  pushWorkspaceSubdirs('packages')
  pushWorkspaceSubdirs('templates')

  for (const extra of ['website', 'scripts']) {
    const path = join(rootDir, extra, 'node_modules')
    if (existsSync(path)) dirs.push(path)
  }

  dirs.sort((a, b) => b.length - a.length)

  for (const dir of dirs) {
    console.info(`Removing ${relative(rootDir, dir)} …`)
    spawnSync('rm', ['-rf', dir], { stdio: 'inherit' })
  }
}

async function main() {
  const rootDir = getRootDir()
  const overrides = await getZagPackages(rootDir)

  const revert = process.argv.includes('--revert')
  const fullClean = process.argv.includes('--full-clean')
  const lockPath = join(rootDir, 'bun.lock')
  const packageJsonPath = join(rootDir, 'package.json')

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

  if (revert) {
    spawnSync('rm', ['-rf', lockPath], { stdio: 'inherit' })

    if (!packageJson.overrides) return

    for (const key of Object.keys(overrides)) {
      delete packageJson.overrides[key]
    }

    if (Object.keys(packageJson.overrides).length === 0) {
      packageJson.overrides = undefined
    }

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    const oldLockFilePath = join(rootDir, 'bun.lock.copy')
    if (existsSync(oldLockFilePath)) {
      spawnSync('mv', [oldLockFilePath, lockPath], { stdio: 'inherit' })
    }

    spawnSync('bun', ['run', 'clean'], { stdio: 'inherit', cwd: rootDir })
  } else {
    packageJson.overrides ||= {}
    Object.assign(packageJson.overrides, overrides)

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    if (existsSync(lockPath)) {
      spawnSync('cp', [lockPath, `${lockPath}.copy`], { stdio: 'inherit' })
    }

    console.info(
      '\nRemoving bun.lock so the next install can regenerate it from path overrides.\n' +
        '(Keeping the old lockfile with new ../zag/... overrides produces invalid nested entries and parse errors.)\n',
    )
    spawnSync('rm', ['-f', lockPath], { stdio: 'inherit' })

    console.info(
      '\nClearing existing installs so path overrides to local @zag-js packages can link without EEXIST.\n' +
        '(Stale node_modules from registry installs conflict with Bun when switching to ../zag/... overrides.)\n',
    )

    if (fullClean) {
      spawnSync('bun', ['run', 'clean'], { stdio: 'inherit', cwd: rootDir })
    } else {
      removeNodeModulesDirs(rootDir)
    }
  }

  const installArgs = ['install', '--force', '--ignore-scripts']

  if (revert) {
    console.info('\nRunning bun install with --ignore-scripts.\n')
  } else {
    installArgs.push('--linker=hoisted')
    console.info(
      '\nRunning bun install with --ignore-scripts and --linker=hoisted so workspace lifecycle scripts are skipped\n' +
        'and path overrides do not hit EEXIST (the default isolated linker can race when many workspaces link the same ../zag/... package).\n' +
        '(Otherwise website `prepare` runs Panda codegen, which is slow and often unnecessary when only linking local @zag-js packages.)\n' +
        'Run `bun install` from the repo root when you need full installs (Panda, lefthook, etc.).\n',
    )
  }

  spawnSync('bun', installArgs, { stdio: 'inherit', cwd: rootDir })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
