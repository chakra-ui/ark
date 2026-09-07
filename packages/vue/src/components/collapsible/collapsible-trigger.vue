<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CollapsibleTriggerBaseProps extends PolymorphicProps {}
export interface CollapsibleTriggerProps
  extends
    CollapsibleTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CollapsibleTriggerProps>()
const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="collapsible.getTriggerProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
