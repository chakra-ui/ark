<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectTriggerBaseProps extends PolymorphicProps {}
export interface SelectTriggerProps
  extends SelectTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectTriggerProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="select.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
