<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableControlBaseProps extends PolymorphicProps {}
export interface EditableControlProps
  extends EditableControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'
import { useForwardExpose } from '../../utils'

defineProps<EditableControlProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="editable.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
