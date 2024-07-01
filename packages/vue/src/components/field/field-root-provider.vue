<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseFieldReturn } from './use-field'

interface RootProviderProps {
  value: UnwrapRef<UseFieldReturn>
}

export interface FieldRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldRootProviderProps
  extends FieldRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { FieldProvider } from './use-field-context'

const props = defineProps<FieldRootProviderProps>()
const field = computed(() => props.value)

FieldProvider(field)
</script>

<template>
  <ark.div v-bind="field.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
