import { basename, dirname } from 'node:path'
import { moveSync } from 'fs-extra'
import { globby } from 'globby'

const main = async () => {
  const files = await globby(['../frameworks/react/src/*/index.ts'], {})

  files.map((file) =>
    moveSync(
      file.replace('index.ts', `${basename(dirname(file))}.tsx`),
      file.replace('index.ts', `${basename(dirname(file))}.ts`),
    ),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
