import { Box } from 'styled-system/jsx'
import { Tabs, type TabsProps } from '~/components/ui/tabs'

type Props = TabsProps & {
  react?: JSX.Element
  solid?: JSX.Element
  vue?: JSX.Element
}

export const CodeExamples = (props: Props) => (
  <Tabs.Root size="sm" defaultValue="react" {...props}>
    <Tabs.List bg="bg.muted" px="4" pt="3" borderTopRadius="l3">
      <Tabs.Trigger value="react">React</Tabs.Trigger>
      <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
      <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Box borderBottomRadius="l3" px="3" py="4" mt="-5" bg="grayPalette.900" borderWidth="1px">
      <Tabs.Content value="react">{props.react}</Tabs.Content>
      <Tabs.Content value="solid">{props.solid}</Tabs.Content>
      <Tabs.Content value="vue">{props.vue}</Tabs.Content>
    </Box>
  </Tabs.Root>
)
