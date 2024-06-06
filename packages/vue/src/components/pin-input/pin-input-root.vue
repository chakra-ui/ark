<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './pin-input.types'

export interface PinInputRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface PinInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInput } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

const props = withDefaults(defineProps<PinInputRootProps>(), {
  autoFocus: undefined,
  blurOnComplete: undefined,
  disabled: undefined,
  invalid: undefined,
  mask: undefined,
  otp: undefined,
  selectOnFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<PinInputRootEmits>()

const pinInput = usePinInput(props, emits)

PinInputProvider(pinInput)
</script>

<template>
  <ark.div v-bind="pinInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
