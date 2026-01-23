import type { Metadata } from 'next'
import { Box, Container, Stack } from 'styled-system/jsx'
import { stack } from 'styled-system/patterns'
import { CodeTabs } from '~/components/code-tabs'
import { ExamplesFooter } from '~/components/navigation/examples/examples-footer'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { fetchCodeExamples, fetchExample } from '~/lib/examples'
import { getFramework } from '~/lib/frameworks'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page(props: Props) {
  const { id } = await props.params
  const framework = await getFramework()
  const example = await fetchExample(id)
  const codeExamples = await fetchCodeExamples({ id, framework })

  return (
    <Container display="flex" py="12" gap="8" justifyContent="center">
      <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
        <Box maxW="61rem" mx="auto" width="full">
          <article
            className={stack({
              lineHeight: '1.75',
              color: 'var(--colors-prose-body)',
              mb: '10',
            })}
          >
            <Heading as="h1" fontWeight="bold" textStyle="4xl">
              {example.title}
            </Heading>
            <Text color="fg.muted">{example.description}</Text>
          </article>
          <Stack gap="6">
            <Box borderRadius="lg" borderWidth="1px" overflow="hidden" bg="bg.default" className="not-prose">
              <iframe
                src={example.previewUrl}
                title={example.title}
                style={{
                  width: '100%',
                  height: '500px',
                  border: 'none',
                }}
              />
            </Box>
            {codeExamples.length > 0 && <CodeTabs examples={codeExamples} defaultValue={codeExamples[0]?.value} />}
          </Stack>
        </Box>
        <Box maxW="61rem" mx="auto" width="full">
          <ExamplesFooter example={example} />
        </Box>
      </Stack>
    </Container>
  )
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { id } = await props.params
  const example = await fetchExample(id)
  if (!example) return {}
  return {
    title: example.title,
    description: example.description,
    openGraph: { url: `/examples/${id}`, description: example.description },
  }
}
