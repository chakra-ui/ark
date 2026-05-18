<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './pin-input.types.ts'

export interface PinInputRootBaseProps extends RootProps, PolymorphicProps {}
export interface PinInputRootProps
  extends
    PinInputRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface PinInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePinInput } from './use-pin-input.ts'
import { PinInputProvider } from './use-pin-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<PinInputRootProps>(), {
  autoFocus: undefined,
  autoSubmit: undefined,
  blurOnComplete: undefined,
  disabled: undefined,
  invalid: undefined,
  mask: undefined,
  otp: undefined,
  readOnly: undefined,
  required: undefined,
  selectOnFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<PinInputRootEmits>()

const pinInput = usePinInput(props, emits)

PinInputProvider(pinInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="pinInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
