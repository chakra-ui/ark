<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UsePinInputReturn } from './use-pin-input'

interface RootProviderProps {
  value: UnwrapRef<UsePinInputReturn>
}

export interface PinInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PinInputRootProviderProps
  extends PinInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { PinInputProvider } from './use-pin-input-context'
import { useForwardExpose } from '../../utils'

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
