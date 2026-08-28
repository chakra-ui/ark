<script lang="ts">
import type { TriggerProps } from '@zag-js/combobox'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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

const props = defineProps<ComboboxTriggerProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.button v-bind="combobox.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
