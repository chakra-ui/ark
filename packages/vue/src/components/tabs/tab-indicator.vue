<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TabIndicatorProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

defineProps<TabIndicatorProps>()
const tabs = useTabsContext()
</script>

<template>
  <ark.div v-bind="tabs.indicatorProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
