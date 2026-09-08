<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { TriggerProps, TriggerState } from '@zag-js/combobox'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ComboboxTriggerState extends TriggerState {}
export interface ComboboxTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface ComboboxTriggerProps
  extends
    ComboboxTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'

const props = withDefaults(defineProps<ComboboxTriggerProps>(), {
  focusable: undefined,
} satisfies BooleanDefaults<TriggerProps>)

defineSlots<PolymorphicSlots<ComboboxTriggerState>>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.button v-bind="combobox.getTriggerProps(props)" :state="combobox.getTriggerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
