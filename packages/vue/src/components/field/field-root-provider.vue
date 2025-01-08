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
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { FieldProvider } from './use-field-context'
const props = defineProps<FieldRootProviderProps>()
const field = computed(() => props.value)

FieldProvider(field)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="field.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
