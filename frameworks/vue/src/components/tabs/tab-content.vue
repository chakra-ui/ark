<script lang="ts">
import type { ContentProps } from '@zag-js/tabs'
import type { PolimoprhicProps } from '../factory'

export interface TabContentProps extends PolimoprhicProps, ContentProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { useTabsContext } from './use-tabs-context'
import { Presence } from '../presence'

const props = defineProps<TabContentProps>()
const tabs = useTabsContext()
const renderStrategy = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="tabs.getContentProps(props)"
    :present="tabs.value === props.value"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
