import type { Metadata } from 'next'
import { Box, Container, Stack } from 'styled-system/jsx'
import { ExamplePreview } from '~/components/example-preview'
import { Heading, Text } from '~/components/ui'
import { Prose } from '~/components/ui/prose'
import { fetchExample, fetchExamples } from '~/lib/examples'

interface Props {
  params: { id: string }
}

export default async function Page(props: Props) {
  const example = await fetchExample(props.params)

  return (
    <Container display="flex" py="12" gap="8" justifyContent="center">
      <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
        <Box maxW="61rem" mx="auto" width="full">
          <Prose css={{ maxWidth: 'unset' }}>
            <Heading as="h1" fontWeight="bold">
              {example.title}
            </Heading>
            <Text className="lead" color="fg.muted" mb="12">
              {example.description}
            </Text>
          </Prose>
          <ExamplePreview example={example} />
        </Box>
      </Stack>
    </Container>
  )
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const example = await fetchExample(props.params)
  return example ? { title: example.title, description: example.description } : {}
}

export const generateStaticParams = async () => {
  const examples = await fetchExamples()

  return ['react', 'solid', 'vue'].flatMap((framework) =>
    examples.map((example) => ({ framework, id: example.id })),
  )
}
