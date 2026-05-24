<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PinInputControlBaseProps extends PolymorphicProps {}
export interface PinInputControlProps
  extends
    PinInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePinInputContext } from './use-pin-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PinInputControlProps>()
const pinInput = usePinInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="pinInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
