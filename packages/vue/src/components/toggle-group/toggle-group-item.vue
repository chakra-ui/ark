<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/toggle-group'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ToggleGroupItemState extends ItemState {}
export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ToggleGroupItemProps
  extends
    ToggleGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useToggleGroupContext } from './use-toggle-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ToggleGroupItemProps>()

defineSlots<PolymorphicSlots<ToggleGroupItemState>>()
const toggleGroup = useToggleGroupContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="toggleGroup.getItemProps(props)" :state="toggleGroup.getItemState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
