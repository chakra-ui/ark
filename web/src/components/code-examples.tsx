import { css } from 'styled-system/css'
import { Box } from 'styled-system/jsx'
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
    <Tabs size="sm" defaultValue="react" {...props}>
      <TabList bg="bg.muted" px="4" pt="3" borderTopRadius="l3">
        <TabTrigger value="react">React</TabTrigger>
        <TabTrigger value="solid" disabled={!Boolean(props.solid)}>
          Solid
        </TabTrigger>
        <TabTrigger value="vue" disabled={!Boolean(props.vue)}>
          Vue
        </TabTrigger>
        <TabIndicator />
      </TabList>
      <Box
        borderBottomRadius="l3"
        overflow="hidden"
        mt="-5"
        bg="grayPalette.900"
        className={css({
          '& pre': {
            borderWidth: '0',
            borderRadius: '0',
            my: '0',
          },
        })}
      >
        <TabContent value="react">{props.react}</TabContent>
        <TabContent value="solid">{props.solid}</TabContent>
        <TabContent value="vue">{props.vue}</TabContent>
      </Box>
    </Tabs>
  )
}
