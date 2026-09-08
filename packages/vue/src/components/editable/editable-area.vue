<script lang="ts">
import type { AreaState } from '@zag-js/editable'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface EditableAreaState extends AreaState {}
export interface EditableAreaBaseProps extends PolymorphicProps {}
export interface EditableAreaProps
  extends
    EditableAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditableAreaProps>()

defineSlots<PolymorphicSlots<EditableAreaState>>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="editable.getAreaProps()" :state="editable.getAreaState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
