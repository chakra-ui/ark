<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PinInputLabelBaseProps extends PolymorphicProps {}
export interface PinInputLabelProps
  extends
    PinInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePinInputContext } from './use-pin-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PinInputLabelProps>()
const pinInput = usePinInputContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="pinInput.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
