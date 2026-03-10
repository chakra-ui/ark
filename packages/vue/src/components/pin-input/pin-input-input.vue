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
import { computed, watch } from 'vue'

const props = defineProps<PinInputInputProps>()
const pinInput = usePinInputContext()

// ts-plugin(2590)
const inputProps = computed(() => pinInput.value.getInputProps(props))

let lastValue = ''
function onInput(e: InputEvent) {
  const nextValue = (e.target as HTMLInputElement)?.value ?? ''

  if (nextValue === lastValue) return

  lastValue = nextValue
  inputProps.value.onInput?.(e)
}

// watch current index input's value in machine state, then sync it to lastValue
watch(
  () => pinInput.value.value[props.index],
  (newVal) => {
    lastValue = newVal
  },
)

const omited = computed(() => omit(inputProps.value, ['onInput']))

useForwardExpose()
</script>

<template>
  <ark.input v-bind="omited" @input="onInput" :as-child="asChild">
    <slot />
  </ark.input>
</template>
