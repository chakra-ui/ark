import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { kebabCase } from 'change-case'
import dynamic from 'next/dynamic'

interface Props {
  name: string
}

export const ComponentLivePreview = async (props: Props) => {
  const { name } = props
  const component = 'avatar'

  const Example = dynamic(() => import('@ark-ui/react/examples').then((mod) => mod.Avatar).then((mod) => mod.Basic))
  const storyPath = join(process.cwd(), `../packages/react/src/components/${component}/examples/${kebabCase(name)}.tsx`)

  const sourceCode = await readFile(storyPath, 'utf-8')
    .then((code) => code.replace('@ark-ui/design-system', '@ark-ui/react'))
    .catch(() => null)

  if (!sourceCode) {
    return <div>Example not found</div>
  }

  return (
    <div className="not-prose">
      <Example />
      <pre>
        <code>{sourceCode}</code>
      </pre>
    </div>
  )
}
