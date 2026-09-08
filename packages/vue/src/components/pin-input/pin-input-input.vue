<script lang="ts">
import type { InputProps, InputState } from '@zag-js/pin-input'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface PinInputInputState extends InputState {}
export interface PinInputInputBaseProps extends InputProps, PolymorphicProps {}
export interface PinInputInputProps
  extends
    PinInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePinInputContext } from './use-pin-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PinInputInputProps>()

defineSlots<PolymorphicSlots<PinInputInputState>>()
const pinInput = usePinInputContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="pinInput.getInputProps(props)" :state="pinInput.getInputState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
