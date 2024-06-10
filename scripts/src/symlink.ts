import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const overrides = {
  '@zag-js/core': '../zag/packages/core',
  '@zag-js/react': '../zag/packages/frameworks/react',
  '@zag-js/vue': '../zag/packages/frameworks/vue',
  '@zag-js/solid': '../zag/packages/frameworks/solid',
  '@zag-js/store': '../zag/packages/store',
  '@zag-js/utils': '../zag/packages/utilities/core',
  '@zag-js/dom-query': '../zag/packages/utilities/dom-query',
  '@zag-js/text-selection': '../zag/packages/utilities/text-selection',
  '@zag-js/dom-event': '../zag/packages/utilities/dom-event',
  '@zag-js/types': '../zag/packages/types',
  '@zag-js/presence': '../zag/packages/machines/presence',
}

async function main() {
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
