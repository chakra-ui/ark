<script lang="ts">
import type { ContentProps } from '@zag-js/tabs'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TabContentBaseProps extends ContentProps, PolymorphicProps {}
export interface TabContentProps
  extends
    TabContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { useTabsContext } from './use-tabs-context'
import { PresenceProvider, usePresence } from '../presence'
import { ark } from '../factory'

const props = defineProps<TabContentProps>()

const tabs = useTabsContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: tabs.value.value === props.value,
    immediate: true,
  })),
)

PresenceProvider(presence)

const mergedProps = computed(() => mergeProps(tabs.value.getContentProps(props), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
