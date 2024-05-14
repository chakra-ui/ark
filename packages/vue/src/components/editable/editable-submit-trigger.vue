<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface EditableSubmitTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'

defineProps<EditableSubmitTriggerProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.button v-bind="editable.submitTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
