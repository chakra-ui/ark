<script lang="ts">
import type { InputProps } from '@zag-js/pin-input'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { omit } from '@zag-js/utils'

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
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { computed } from 'vue'

const props = defineProps<PinInputInputProps>()
const pinInput = usePinInputContext()

const inputProps = computed(() => pinInput.value.getInputProps(props))
let lastValue = ''

function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value

  if (v === lastValue) return

  lastValue = v
  inputProps.value.onInput?.(e)
}
const omited = omit(inputProps.value, ['onChange', 'onInput'])

useForwardExpose()
</script>

<template>
  <ark.input v-bind="omited" @input="onInput" :as-child="asChild">
    <slot />
  </ark.input>
</template>
