<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputControlBaseProps extends PolymorphicProps {}
export interface NumberInputControlProps
  extends NumberInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputControlProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="numberInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
