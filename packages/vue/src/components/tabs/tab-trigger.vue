<script lang="ts">
import type { TriggerProps } from '@zag-js/tabs'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TabTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface TabTriggerProps
  extends TabTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTabsContext } from './use-tabs-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TabTriggerProps>()
const tabs = useTabsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tabs.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
