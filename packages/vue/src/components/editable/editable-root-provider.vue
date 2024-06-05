<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseEditableReturn } from './use-editable'

interface RootProviderProps {
  value: UnwrapRef<UseEditableReturn>
}

export interface EditableRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'placeholder'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { EditableProvider } from './use-editable-context'

const props = defineProps<EditableRootProviderProps>()
const editable = computed(() => props.value)

EditableProvider(editable)
</script>

<template>
  <ark.div v-bind="editable.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
