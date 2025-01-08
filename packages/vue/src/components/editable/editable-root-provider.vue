<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseEditableReturn } from './use-editable'

interface RootProviderProps {
  value: UnwrapRef<UseEditableReturn>
}

export interface EditableRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface EditableRootProviderProps
  extends EditableRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'placeholder'> {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { EditableProvider } from './use-editable-context'
const props = defineProps<EditableRootProviderProps>()
const editable = computed(() => props.value)

EditableProvider(editable)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="editable.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
