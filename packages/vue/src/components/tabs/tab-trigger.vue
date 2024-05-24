<script lang="ts">
import type { TriggerProps } from '@zag-js/tabs'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TabTriggerProps
  extends PolymorphicProps,
    TriggerProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
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
