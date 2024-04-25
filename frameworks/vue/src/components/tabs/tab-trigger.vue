<script lang="ts">
import type { TriggerProps } from '@zag-js/tabs'
import type { PolymorphicProps } from '../factory'

export interface TabTriggerProps extends PolymorphicProps, TriggerProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

const props = defineProps<TabTriggerProps>()
const tabs = useTabsContext()
</script>

<template>
  <ark.button v-bind="tabs.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
