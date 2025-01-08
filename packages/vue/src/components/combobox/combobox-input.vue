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
import { useFieldContext } from '../field'
import { useForwardExpose } from '../../utils'

defineProps<ComboboxInputProps>()
const combobox = useComboboxContext()
const field = useFieldContext()
useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="combobox.getInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
