import { transformerNotationHighlight } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
import { Box, Container } from 'styled-system/jsx'
import { CodePreview } from '~/components/code-preview'
import { IFrameExample } from '~/components/iframe-example'

interface Props {
  params: { component: string; framework: string; id: string }
}

export default async function Page(props: Props) {
  const { component, framework, id } = props.params
  const sourceFiles = await fetch(
    `http://localhost:3001/api/${framework}/examples/${component}/${id}`,
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
    <Container py={{ base: '12', md: '16' }} maxW="3xl">
      <h1>Example {id}</h1>
      <IFrameExample />
      <Box borderWidth="1px" borderColor="gray.dark.4" borderRadius="lg" overflow="hidden">
        <CodePreview html={html} code={code} />
      </Box>
    </Container>
  )
}

export const generateStaticParams = () => ['popover-toooltip'].map((id) => ({ params: { id } }))
