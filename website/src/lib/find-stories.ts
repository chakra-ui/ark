import fs from 'node:fs'
const frameworks = ['react', 'solid', 'vue']

interface Props {
  component: string
  id: string
}

export const findStories = async (props: Props) => {
  const { component, id } = props

  return frameworks.map((framework) => {
    const story = fs.readFileSync(
      `../frameworks/${framework}/src/components/${component}/examples/${id.toLowerCase()}.${
        framework === 'vue' ? 'vue' : 'tsx'
      }`,
      'utf8',
    )
    return story
  })
}
