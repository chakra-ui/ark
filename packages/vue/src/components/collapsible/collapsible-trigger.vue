<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CollapsibleTriggerBaseProps extends PolymorphicProps {}
export interface CollapsibleTriggerProps
  extends CollapsibleTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

defineProps<CollapsibleTriggerProps>()
const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="collapsible.getTriggerProps()">
    <slot />
  </ark.button>
</template>
