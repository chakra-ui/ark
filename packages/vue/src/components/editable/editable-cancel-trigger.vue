<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableCancelTriggerProps
  extends PolymorphicProps,
    /* @vue-ignore */ ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'

defineProps<EditableCancelTriggerProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.button v-bind="editable.cancelTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
