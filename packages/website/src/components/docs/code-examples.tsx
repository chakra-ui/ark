import { css } from '@ark-ui/styled-system/css'
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
    <Tabs size="sm" defaultValue="react" {...props}>
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
          '& code': {
            p: '0',
          },
        })}
      >
        <TabContent value="react" style={{ marginTop: '20px !important' }}>
          {props.react}
        </TabContent>
        <TabContent value="solid">{props.solid}</TabContent>
        <TabContent value="vue">{props.vue}</TabContent>
      </Box>
    </Tabs>
  )
}
