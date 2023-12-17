import { findUpSync } from 'find-up'
import fs from 'fs/promises'
import { globby } from 'globby'
import path from 'path'

async function main() {
  const root = path.dirname(findUpSync('pnpm-lock.yaml')!)
  process.chdir(root)

  // const files = await fs.readdir(
  //   path.join(__dirname, '../../../packages/website/src/content/stories/react'),
  // )
  const react = await globby(['packages/website/src/content/stories/react'], { objectMode: true })
  const vue = await globby(['packages/website/src/content/stories/vue'], { objectMode: true })

  // find not exist story
  const diff = react.filter((r) => !vue.find((v) => r.name === v.name)).map((e) => e.name)
  console.log(`[The stories in react, but don't exist in vue]: \n${diff.join('\n')}`)

  // find different story
  react.forEach(async (r) => {
    const v = vue.find((v) => r.name === v.name)
    if (v) {
      const rf = await fs.readFile(r.path, 'utf-8')
      const vf = await fs.readFile(v.path, 'utf-8')

      const rfs = Object.keys(JSON.parse(rf))
      const vfs = Object.keys(JSON.parse(vf))
      if (rfs.length !== vfs.length) {
        console.log(r.name, rfs, vfs)
      }
    }
  })
}

main()
