<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseEditableReturn } from './use-editable.ts'

interface RootProviderProps {
  value: UnwrapRef<UseEditableReturn>
}

export interface EditableRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface EditableRootProviderProps
  extends
    EditableRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'placeholder'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { EditableProvider } from './use-editable-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

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
