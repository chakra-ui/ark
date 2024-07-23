<script lang="ts">
import type { FieldsetHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseFieldsetReturn } from './use-fieldset'

interface RootProviderProps {
  value: UnwrapRef<UseFieldsetReturn>
}

export interface FieldsetRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldsetRootProviderProps
  extends FieldsetRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    FieldsetHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { FieldsetProvider } from './use-fieldset-context'

const props = defineProps<FieldsetRootProviderProps>()
const fieldset = computed(() => props.value)

FieldsetProvider(fieldset)
</script>

<template>
  <ark.fieldset v-bind="fieldset.getRootProps()" :as-child="asChild">
    <slot />
  </ark.fieldset>
</template>
