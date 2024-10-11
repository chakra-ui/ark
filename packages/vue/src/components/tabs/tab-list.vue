<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TabListBaseProps extends PolymorphicProps {}
export interface TabListProps
  extends TabListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTabsContext } from './use-tabs-context'
import { useForwardExpose } from '../../utils'

defineProps<TabListProps>()
const tabs = useTabsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tabs.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
