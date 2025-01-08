<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TabIndicatorBaseProps extends PolymorphicProps {}
export interface TabIndicatorProps
  extends TabIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTabsContext } from './use-tabs-context'
import { useForwardExpose } from '../../utils'

defineProps<TabIndicatorProps>()
const tabs = useTabsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tabs.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
