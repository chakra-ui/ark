import { basename, dirname } from 'node:path'
import { readFileSync, writeFileSync } from 'fs-extra'
import { globby } from 'globby'

const main = async () => {
  const files = await globby(['../frameworks/react/src/*/index.ts'], {})

  files
    .filter((file) => !['presence', 'environment', 'locale'].includes(basename(dirname(file))))
    .map((file) => file.replace('index', basename(dirname(file))))
    .map((x) => {
      const fileContent = readFileSync(x, 'utf8')
      const updated = fileContent.replaceAll('import', 'export')
      writeFileSync(x, updated, 'utf8')
    })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
