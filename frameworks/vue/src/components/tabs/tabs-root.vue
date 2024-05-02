<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { RootEmits, RootProps } from './tabs.types'

export interface TabsRootProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface TabsRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark, type PolymorphicProps } from '../factory'
import { useTabs } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

const defaults: BooleanDefaults<RootProps> = {
  loopFocus: undefined,
}
const props = withDefaults(defineProps<TabsRootProps>(), defaults)
const emits = defineEmits<TabsRootEmits>()

const tabs = useTabs(props, emits)

TabsProvider(tabs)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="tabs.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
