<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UsePinInputReturn } from './use-pin-input.ts'

interface RootProviderProps {
  value: UnwrapRef<UsePinInputReturn>
}

export interface PinInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PinInputRootProviderProps
  extends
    PinInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { PinInputProvider } from './use-pin-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PinInputRootProviderProps>()
const pinInput = computed(() => props.value)

PinInputProvider(pinInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="pinInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
