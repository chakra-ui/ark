<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectClearTriggerBaseProps extends PolymorphicProps {}
export interface SelectClearTriggerProps
  extends SelectClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useForwardExpose } from '../../utils'

defineProps<SelectClearTriggerProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="select.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
