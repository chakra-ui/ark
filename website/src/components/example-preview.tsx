import { Code2Icon, EyeIcon, LockIcon } from 'lucide-react'
import NextLink from 'next/link'
import { Box, Stack } from 'styled-system/jsx'
import { hasUserPermission } from '~/app/actions'
import { Button } from '~/components/ui/button'
import { Tabs } from '~/components/ui/tabs'
import { Text } from '~/components/ui/text'
import { type Example, fetchCodeExamples } from '~/lib/examples'
import { getServerContext } from '~/lib/server-context'
import { CodeTabs } from './code-tabs'
import { IFrameExample } from './iframe-example'

interface Props {
  example: Example
}

export const ExamplePreview = async (props: Props) => {
  const { example } = props
  const { framework } = getServerContext()

  const codeExamplesAvailable = example.accessLevel === 'free' || (await hasUserPermission())
  const codeExamples = codeExamplesAvailable
    ? await fetchCodeExamples({ id: example.id, framework })
    : []

  return codeExamplesAvailable ? (
    <Tabs.Root variant="enclosed" defaultValue="preview" size="sm" lazyMount>
      <Tabs.List width="fit-content" alignSelf="flex-end">
        <Tabs.Trigger value="preview">
          <EyeIcon />
          <Text>Preview</Text>
        </Tabs.Trigger>
        <Tabs.Trigger value="code">
          <Code2Icon />
          <Text>Code</Text>
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="preview" px="!0">
        <Box borderRadius="l3" overflow="hidden" minH="md" borderWidth="1px">
          <IFrameExample url={example.previewUrl} />
        </Box>
      </Tabs.Content>
      <Tabs.Content value="code" px="!0">
        <CodeTabs
          examples={codeExamples}
          defaultValue={framework === 'vue' ? 'index.vue' : 'index.tsx'}
        />
      </Tabs.Content>
    </Tabs.Root>
  ) : (
    <Stack gap="3.5">
      <Button variant="outline" asChild alignSelf="flex-end" borderColor="border.muted">
        <NextLink href="/react/plus">
          <LockIcon />
          Unlock Ark Plus
        </NextLink>
      </Button>
      <Box borderRadius="l3" overflow="hidden" minH="md" borderWidth="1px">
        <IFrameExample url={example.previewUrl} />
      </Box>
    </Stack>
  )
}
