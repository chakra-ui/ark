import { readFile } from 'node:fs/promises'
const frameworks = ['react', 'solid', 'vue']

interface Props {
  component: string
  id: string
}

export const findExample = async (props: Props) => {
  const { component, id } = props

  return Promise.all(
    frameworks.map(async (framework) => {
      const filename = id.toLowerCase() + (framework === 'vue' ? '.vue' : '.tsx')
      const path = `../frameworks/${framework}/src/components/${component}/examples/${filename}`
      const content = await readFile(path, 'utf-8').catch(() => 'Example not found')

      return content
        .replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`)
        .replaceAll(/from '\..*'/g, `from '@ark-ui/${framework}'`)
    }),
  )
}
