<script lang="ts">
import type { ContentProps } from '@zag-js/tabs'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TabContentBaseProps extends ContentProps, PolymorphicProps {}
export interface TabContentProps
  extends TabContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { useTabsContext } from './use-tabs-context'
import { Presence } from '../presence'

const props = defineProps<TabContentProps>()
const tabs = useTabsContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="tabs.getContentProps(props)"
    :present="tabs.value === props.value"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
    :immediate="true"
  >
    <slot />
  </Presence>
</template>
