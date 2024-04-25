<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface EditableLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'

defineProps<EditableLabelProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.label v-bind="editable.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
