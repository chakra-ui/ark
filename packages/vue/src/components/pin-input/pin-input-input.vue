<script lang="ts">
import type { InputProps } from '@zag-js/pin-input'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PinInputInputBaseProps extends InputProps, PolymorphicProps {}
export interface PinInputInputProps
  extends PinInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<PinInputInputProps>()
const pinInput = usePinInputContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="pinInput.getInputProps(props)" :as-child="asChild"><slot /></ark.input>
</template>
