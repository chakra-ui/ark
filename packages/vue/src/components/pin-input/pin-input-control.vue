<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PinInputControlBaseProps extends PolymorphicProps {}
export interface PinInputControlProps
  extends PinInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

defineProps<PinInputControlProps>()
const pinInput = usePinInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="pinInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
