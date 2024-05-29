import { Code2Icon, EyeIcon } from 'lucide-react'
import { Box } from 'styled-system/jsx'
import { Tabs, Text } from '~/components/ui'
import type { Example } from '~/lib/examples'
import { CodeTabs } from './code-tabs'
import { IFrameExample } from './iframe-example'

interface Props {
  example: Example
}

export const ExamplePreview = (props: Props) => {
  const { example } = props
  return (
    <Tabs.Root variant="enclosed" defaultValue="preview" size="sm" lazyMount>
      <Tabs.List width="fit-content" alignSelf="flex-end">
        <Tabs.Trigger value="preview">
          <EyeIcon />
          <Text>Preview</Text>
        </Tabs.Trigger>
        <Tabs.Trigger value="code" disabled>
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
        <CodeTabs examples={[]} defaultValue="index.tsx" />
      </Tabs.Content>
    </Tabs.Root>
  )
}
