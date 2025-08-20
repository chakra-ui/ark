import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { Box, Container, Stack } from 'styled-system/jsx'
import { ExamplePreview } from '~/components/example-preview'
import { ExamplesFooter } from '~/components/navigation/examples/examples-footer'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { fetchExample } from '~/lib/examples'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page(props: Props) {
  const { id } = await props.params
  const example = await fetchExample(id)

  return (
    <Container display="flex" py="12" gap="8" justifyContent="center">
      <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
        <Box maxW="61rem" mx="auto" width="full">
          <article className={css({ lineHeight: '1.75', color: 'var(--colors-prose-body)' })}>
            <Heading as="h1" fontWeight="bold">
              {example.title}
            </Heading>
            <Text className="lead" color="fg.muted" mb="12">
              {example.description}
            </Text>
          </article>
          <ExamplePreview example={example} />
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
  return example ? { title: example.title, description: example.description } : {}
}
