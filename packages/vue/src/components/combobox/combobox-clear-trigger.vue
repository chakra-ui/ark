<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxClearTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxClearTriggerProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.button v-bind="combobox.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
