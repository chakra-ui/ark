<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CheckboxHiddenInputBaseProps extends PolymorphicProps {}
export interface CheckboxHiddenInputProps
  extends CheckboxHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

defineProps<CheckboxHiddenInputProps>()
const checkbox = useCheckboxContext()
</script>

<template>
  <ark.input v-bind="checkbox.getHiddenInputProps()" :as-child="asChild" />
</template>
