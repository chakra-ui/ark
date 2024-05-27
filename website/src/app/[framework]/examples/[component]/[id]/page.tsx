import { Container, Stack } from 'styled-system/jsx'
import { CodeTabs } from '~/components/code-tabs'
import { IFrameExample } from '~/components/iframe-example'
import { Heading, Text } from '~/components/ui'
import { Prose } from '~/components/ui/prose'
import { fetchExample } from '~/lib/fetch-example'

interface Props {
  params: { component: string; framework: string; id: string }
}

export default async function Page(props: Props) {
  const data = await fetchExample(props.params)

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
        <IFrameExample />
      </Container>
      <Container maxW="49rem">
        <CodeTabs examples={data} defaultValue="index.tsx" />
      </Container>
    </Stack>
  )
}

export const generateStaticParams = () => ['popover-toooltip'].map((id) => ({ params: { id } }))
