import { Box, Container, Stack } from 'styled-system/jsx'
import { ExamplePreview } from '~/components/example-preview'
import { Heading, Text } from '~/components/ui'
import { Prose } from '~/components/ui/prose'
import { fetchExample } from '~/lib/fetch-example'

interface Props {
  params: { component: string; framework: string; id: string }
}

const { ARK_PLUS_URL } = process.env

export default async function Page(props: Props) {
  const { component, id } = props.params
  const data = await fetchExample(props.params)
  const previewUrl = `${ARK_PLUS_URL}/examples/${component}/${id}`

  return (
    <Container display="flex" py="12" gap="8" justifyContent="center">
      <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
        <Box maxW="61rem" mx="auto" width="full">
          <Prose css={{ maxWidth: 'unset' }}>
            <Heading as="h1" fontWeight="bold">
              Nested Menu
            </Heading>
            <Text className="lead" color="fg.muted" mb="12">
              The nested menu displays nested item lists.
            </Text>
          </Prose>
          <ExamplePreview previewUrl={previewUrl} data={data} />
        </Box>
      </Stack>
    </Container>
  )
}

export const generateStaticParams = () => ['popover-toooltip'].map((id) => ({ params: { id } }))
