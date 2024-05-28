import { Code2Icon, EyeIcon } from 'lucide-react'
import { Box } from 'styled-system/jsx'
import { Tabs, Text } from '~/components/ui'
import { CodeTabs } from './code-tabs'
import { IFrameExample } from './iframe-example'

interface Props {
  previewUrl: string
  data: any[]
}

export const ExamplePreview = (props: Props) => {
  const { previewUrl, data } = props
  return (
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
          <IFrameExample url={previewUrl} />
        </Box>
      </Tabs.Content>
      <Tabs.Content value="code" px="!0">
        <CodeTabs examples={data} defaultValue={data[0].value} />
      </Tabs.Content>
    </Tabs.Root>
  )
}
