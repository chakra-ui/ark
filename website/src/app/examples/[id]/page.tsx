import { transformerNotationHighlight } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
import { Box } from 'styled-system/jsx'
import { CodePreview } from '~/components/code-preview'
import { PlusExample } from '~/components/plus-example'

interface Props {
  params: { id: string }
}

export default async function Page(props: Props) {
  const { id } = props.params

  const sourceFiles = await fetch(
    'https://ark-plus.vercel.app/api/react/examples/popover-tooltip',
    {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      },
    },
  ).then((res) => res.json())

  const code = sourceFiles[0].content

  const html = await codeToHtml(code, {
    lang: 'tsx',
    theme: 'github-dark-default',
    transformers: [transformerNotationHighlight()],
  })

  return (
    <div>
      <h1>Example {id}</h1>
      <PlusExample />
      <Box borderWidth="1px" borderColor="gray.dark.4" borderRadius="lg" overflow="hidden">
        <CodePreview html={html} code={code} />
      </Box>
    </div>
  )
}

export const generateStaticParams = () => ['popover-toooltip'].map((id) => ({ params: { id } }))
