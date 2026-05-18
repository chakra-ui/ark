// Angular is intentionally excluded: Angular's per-secondary-entry layout (`packages/angular/<comp>/public-api.ts`)
// is incompatible with the React-source-of-truth `src/components/<comp>/index.ts` pattern this script assumes.
import { basename, dirname } from 'node:path'
import { copyFileSync } from 'fs-extra'
import { globby } from 'globby'

const main = async () => {
  const files = await globby(['../packages/react/src/components/*/index.ts'], {})

  files
    .filter((file) => !['presence', 'portal', 'highlight', 'frame', 'client-only'].includes(basename(dirname(file))))
    .forEach((file) => {
      try {
        // eg. copy `react/src/avatar/index.ts` to `solid/src/avatar/index.ts`
        copyFileSync(file, file.replace('react', 'solid').replace('.ts', '.tsx'))
        // eg. copy `react/src/avatar/avatar.ts` to `solid/src/avatar/avatar.ts`
        copyFileSync(
          file.replace('index', basename(dirname(file))),
          file.replace('react', 'solid').replace('index', basename(dirname(file))),
        )
      } catch (e) {
        console.log('oops', file, e)
      }
    })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
