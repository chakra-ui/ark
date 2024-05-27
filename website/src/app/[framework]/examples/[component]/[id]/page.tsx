import { Container, Flex, Stack } from 'styled-system/jsx'
import { CodeTabs } from '~/components/code-tabs'
import { IFrameExample } from '~/components/iframe-example'
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
  const url = `${ARK_PLUS_URL}/examples/${component}/${id}`

  return (
    <Stack gap={{ base: '8', md: '12' }} py="12">
      <Container maxW="49rem">
        <Prose>
          <Heading as="h1" fontWeight="bold">
            Nested Menu
          </Heading>
          <Text className="lead" color="fg.muted">
            The nested menu displays nested item lists.
          </Text>
        </Prose>
      </Container>
      <Container maxW="65rem" mb="6">
        <Flex
          minH="md"
          bg="bg.default"
          width="full"
          overflow="hidden"
          mx="auto"
          boxShadow="xl"
          borderRadius="2xl"
        >
          <IFrameExample url={url} />
        </Flex>
      </Container>
      <Container maxW="49rem">
        <CodeTabs examples={data} defaultValue="index.tsx" />
      </Container>
    </Stack>
  )
}

export const generateStaticParams = () => ['popover-toooltip'].map((id) => ({ params: { id } }))
