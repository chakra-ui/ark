<script lang="ts">
import type { RootState } from '@zag-js/checkbox'
import type { LabelHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseCheckboxReturn } from './use-checkbox.ts'

interface RootProviderProps {
  value: UnwrapRef<UseCheckboxReturn>
}

export interface CheckboxRootProviderState extends RootState {}
export interface CheckboxRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CheckboxRootProviderProps
  extends
    CheckboxRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { CheckboxProvider } from './use-checkbox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<CheckboxRootProviderProps>()

defineSlots<PolymorphicSlots<CheckboxRootProviderState>>()
const checkbox = computed(() => props.value)

CheckboxProvider(checkbox)

useForwardExpose()
</script>

<template>
  <ark.label v-bind="checkbox.getRootProps()" :state="checkbox.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
