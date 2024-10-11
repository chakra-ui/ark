<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableLabelBaseProps extends PolymorphicProps {}
export interface EditableLabelProps
  extends EditableLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'
import { useForwardExpose } from '../../utils'

defineProps<EditableLabelProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="editable.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
