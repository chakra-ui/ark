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
    <>
      <Container maxW="49rem" py="12">
        <Prose>
          <Heading as="h1" fontWeight="bold">
            Nested Menu
          </Heading>
          <Text className="lead" color="fg.muted" mb="6">
            The nested menu displays nested item lists.
          </Text>
        </Prose>
      </Container>
      <Container maxW="65rem">
        <IFrameExample />
      </Container>
      <Container maxW="49rem" py="12">
        <CodeTabs examples={data} defaultValue="index.tsx" mt="12" />
      </Container>
    </>
  )
}

export const generateStaticParams = () => ['popover-toooltip'].map((id) => ({ params: { id } }))
