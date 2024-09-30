<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxClearTriggerBaseProps extends PolymorphicProps {}
export interface ComboboxClearTriggerProps
  extends ComboboxClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useForwardExpose } from '../../utils'

defineProps<ComboboxClearTriggerProps>()
const combobox = useComboboxContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="combobox.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
