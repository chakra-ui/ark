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
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { PinInputProvider } from './use-pin-input-context'
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
