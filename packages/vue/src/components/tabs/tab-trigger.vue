<script lang="ts">
import type { TriggerProps } from '@zag-js/tabs'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TabTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface TabTriggerProps
  extends
    TabTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTabsContext } from './use-tabs-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TabTriggerProps>()
const tabs = useTabsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tabs.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
