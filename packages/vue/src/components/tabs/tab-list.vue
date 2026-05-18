<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TabListBaseProps extends PolymorphicProps {}
export interface TabListProps
  extends
    TabListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTabsContext } from './use-tabs-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TabListProps>()
const tabs = useTabsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tabs.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
