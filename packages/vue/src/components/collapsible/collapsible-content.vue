<script lang="ts">
import type { ContentState } from '@zag-js/collapsible'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface CollapsibleContentState extends ContentState {}
export interface CollapsibleContentBaseProps extends PolymorphicProps {}
export interface CollapsibleContentProps
  extends
    CollapsibleContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CollapsibleContentProps>()

defineSlots<PolymorphicSlots<CollapsibleContentState>>()
const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!collapsible.unmounted"
    v-bind="collapsible.getContentProps()"
    :state="collapsible.getContentState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
