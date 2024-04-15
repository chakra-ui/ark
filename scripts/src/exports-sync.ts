import { basename, dirname } from 'node:path'
import { copyFileSync } from 'fs-extra'
import { globby } from 'globby'

const main = async () => {
  const files = await globby(['../frameworks/react/src/components/*/index.ts'], {})

  files
    .filter((file) => !['presence', 'portal'].includes(basename(dirname(file))))
    .map((file) => {
      // eg. copy `react/src/avatar/index.ts` to `solid/src/avatar/index.ts`
      copyFileSync(file, file.replace('react', 'vue'))
      // eg. copy `react/src/avatar/avatar.ts` to `solid/src/avatar/avatar.ts`
      copyFileSync(
        file.replace('index', basename(dirname(file))),
        file.replace('react', 'solid').replace('index', basename(dirname(file))),
      )
    })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
