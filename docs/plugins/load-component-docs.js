const path = require('path')
const fs = require('fs/promises')
const glob = require('glob')
const mkdirp = require('mkdirp')
const { promisify } = require('util')

const asyncGlob = promisify(glob)
const repoRoot = path.resolve(__dirname, '..', '..')
const docsRoot = path.resolve(__dirname, '..', 'docs')

const docsPattern = path.join(repoRoot, 'packages', '*', 'src', '*', 'docs', '*.md?(x)')

async function isFileEqual(file1, file2) {
  const stats = await Promise.all([
    fs.stat(file1).catch(() => false),
    fs.stat(file2).catch(() => false),
  ])
  if (!stats.every(Boolean)) {
    // file does not exist
    return false
  }

  const [file1Content, file2Content] = await Promise.all([fs.readFile(file1), fs.readFile(file2)])
  return file1Content.equals(file2Content)
}

async function loadComponentDocs() {
  const files = await asyncGlob(docsPattern, undefined)

  await Promise.all(
    files.map(async (file) => {
      const match = String(file).match(
        /packages\/(?<framework>\w+)\/src\/(?<component>\w+)\/docs\/(?<restPath>.*)/,
      )
      const { framework, component, restPath } = match?.groups || {}
      if (!framework || !component || !restPath) {
        console.log(`unknown source. skipping ${file}`)
        return
      }

      const dir = path.dirname(restPath)
      const fileName = path.basename(restPath)
      const destDir = path.join(docsRoot, framework, 'components', component, dir)
      await mkdirp(destDir)
      const destFile = path.join(destDir, fileName)

      const isEqual = await isFileEqual(file, destFile)
      if (isEqual) {
        // do not trigger file watcher unnecessarily
        return
      }

      await fs.copyFile(file, destFile)
    }),
  )
}

module.exports = async function loadComponentDocsPlugin() {
  return {
    name: 'load-component-docs',
    extendCli(cli) {
      cli
        .command('load-component-docs')
        .description('Load component docs from all packages')
        .action(async () => {
          await loadComponentDocs()
        })
    },
    getPathsToWatch() {
      return docsPattern
    },
    async loadContent() {
      await loadComponentDocs()
    },
  }
}
