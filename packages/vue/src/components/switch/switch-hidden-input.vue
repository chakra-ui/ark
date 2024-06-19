<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SwitchHiddenInputBaseProps extends PolymorphicProps {}
export interface SwitchHiddenInputProps
  extends SwitchHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

defineProps<SwitchHiddenInputProps>()
const context = useSwitchContext()
</script>

<template>
  <ark.input v-bind="context.getHiddenInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
