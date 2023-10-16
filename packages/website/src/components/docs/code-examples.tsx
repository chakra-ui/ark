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

export const CodeExamples = (props: Props) => {
  return (
    <Tabs size="sm" defaultValue="react" {...props} className="not-prose">
      <TabList bg="bg.muted" px="4" pt="3" borderTopRadius="l3">
        <TabTrigger
          value="react"
          disabled={props.solid?.props.value.includes('Story not available')}
        >
          React
        </TabTrigger>
        <TabTrigger
          value="solid"
          disabled={props.solid?.props.value.includes('Story not available')}
        >
          Solid
        </TabTrigger>
        <TabTrigger value="vue" disabled={props.vue?.props.value.includes('Story not available')}>
          Vue
        </TabTrigger>
        <TabIndicator />
      </TabList>
      <Box borderBottomRadius="l3" overflow="hidden" bg="grayPalette.900">
        <TabContent value="react" p="4">
          {props.react}
        </TabContent>
        <TabContent value="solid" p="4">
          {props.solid}
        </TabContent>
        <TabContent value="vue" p="4">
          {props.vue}
        </TabContent>
      </Box>
    </Tabs>
  )
}
