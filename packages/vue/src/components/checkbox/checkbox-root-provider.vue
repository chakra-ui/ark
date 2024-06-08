<script lang="ts">
import type { LabelHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseCheckboxReturn } from './use-checkbox'

interface RootProviderProps {
  value: UnwrapRef<UseCheckboxReturn>
}

export interface CheckboxRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { CheckboxProvider } from './use-checkbox-context'

const props = defineProps<CheckboxRootProviderProps>()
const checkbox = computed(() => props.value)

CheckboxProvider(checkbox)
</script>

<template>
  <ark.label v-bind="checkbox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
