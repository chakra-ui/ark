<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxInputBaseProps extends PolymorphicProps {}
export interface ComboboxInputProps
  extends ComboboxInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxInputProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.input v-bind="combobox.getInputProps()" :as-child="asChild" />
</template>
