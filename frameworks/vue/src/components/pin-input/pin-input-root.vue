<script lang="ts">
import type { RootEmits, RootProps } from './pin-input.types'

export interface PinInputRootProps extends RootProps, PolimoprhicProps {}
export interface PinInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark, type PolimoprhicProps } from '../factory'
import { usePinInput } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

const props = defineProps<PinInputRootProps>()
const emits = defineEmits<PinInputRootEmits>()
const attrs = useAttrs()

const pinInput = usePinInput(props, emits)

const rootProps = computed(() => ({
  ...attrs,
  ...pinInput.value.rootProps,
}))
PinInputProvider(pinInput)
</script>

<template>
  <ark.div v-bind="rootProps" :as-child="asChild">
    <slot />
  </ark.div>
  <input v-bind="pinInput.hiddenInputProps" />
</template>
