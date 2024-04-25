<script lang="ts">
import type { RootEmits, RootProps } from './editable.types'

export interface EditableRootProps extends RootProps, PolymorphicProps {}
export interface EditableRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useEditable } from './use-editable'
import { EditableProvider } from './use-editable-context'

const props = defineProps<EditableRootProps>()
const emits = defineEmits<EditableRootEmits>()

const editable = useEditable(props, emits)
EditableProvider(editable)
</script>

<template>
  <ark.div v-bind="editable.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
