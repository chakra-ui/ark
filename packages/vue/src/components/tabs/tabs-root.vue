<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './tabs.types.ts'

export interface TabsRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface TabsRootProps
  extends
    TabsRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TabsRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useTabs } from './use-tabs.ts'
import { TabsProvider } from './use-tabs-context.ts'

const props = withDefaults(defineProps<TabsRootProps>(), {
  composite: undefined,
  deselectable: undefined,
  loopFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TabsRootEmits>()

const tabs = useTabs(props, emits)

TabsProvider(tabs)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tabs.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
