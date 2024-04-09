import { Box } from 'styled-system/jsx'
import { Tabs } from '~/components/ui'

import { useStore } from '@nanostores/react'
import { selectedFramework, type SelectedFramework } from '~/stores/framework-select.store'

type Props = Tabs.RootProps & {
  react?: JSX.Element
  solid?: JSX.Element
  vue?: JSX.Element
}

export const CodeExamples = (props: Props) => {
  const $selectedFramework = useStore(selectedFramework)
  return (
    <Tabs.Root
      size="sm"
      value={$selectedFramework}
      onValueChange={(e) => selectedFramework.set(e.value as SelectedFramework)}
      {...props}
      className="not-prose"
    >
      <Tabs.List bg="bg.muted" px="4" pt="3" borderTopRadius="l3">
        <Tabs.Trigger
          value="react"
          disabled={props.solid?.props.value.includes('Story not available')}
        >
          React
        </Tabs.Trigger>
        <Tabs.Trigger
          value="solid"
          disabled={props.solid?.props.value.includes('Story not available')}
        >
          Solid
        </Tabs.Trigger>
        <Tabs.Trigger value="vue" disabled={props.vue?.props.value.includes('Story not available')}>
          Vue
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Box borderBottomRadius="l3" overflow="hidden" bg="grayPalette.900">
        <Tabs.Content value="react" p="4">
          {props.react}
        </Tabs.Content>
        <Tabs.Content value="solid" p="4">
          {props.solid}
        </Tabs.Content>
        <Tabs.Content value="vue" p="4">
          {props.vue}
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
}
