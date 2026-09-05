<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxInputBaseProps extends PolymorphicProps {}
export interface ComboboxInputProps
  extends
    ComboboxInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxInputProps>()
const combobox = useComboboxContext()
const field = useFieldContext()
useForwardExpose()
</script>

<template>
  <ark.input :aria-describedby="field?.ariaDescribedby" v-bind="combobox.getInputProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
