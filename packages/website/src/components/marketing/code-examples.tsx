import { Box } from '@ark-ui/styled-system/jsx'
import {
  TabContent,
  TabIndicator,
  TabList,
  TabTrigger,
  Tabs,
  type TabsProps,
} from '~/components/ui/tabs'

type Props = TabsProps & {
  react?: JSX.Element
  solid?: JSX.Element
  vue?: JSX.Element
}

export const CodeExamples = (props: Props) => (
  <Tabs size="sm" defaultValue="react" {...props}>
    <TabList bg="bg.muted" px="4" pt="3" borderTopRadius="l3">
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabIndicator />
    </TabList>
    <Box borderBottomRadius="l3" px="3" py="4" mt="-5" bg="grayPalette.900" borderWidth="1px">
      <TabContent value="react">{props.react}</TabContent>
      <TabContent value="solid">{props.solid}</TabContent>
      <TabContent value="vue">{props.vue}</TabContent>
    </Box>
  </Tabs>
)
