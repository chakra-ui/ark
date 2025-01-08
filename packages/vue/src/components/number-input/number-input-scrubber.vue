<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputScrubberBaseProps extends PolymorphicProps {}
export interface NumberInputScrubberProps
  extends NumberInputScrubberBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'
import { useForwardExpose } from '../../utils'

defineProps<NumberInputScrubberProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="numberInput.getScrubberProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
