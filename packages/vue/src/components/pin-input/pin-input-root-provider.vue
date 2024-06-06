<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UsePinInputReturn } from './use-pin-input'

interface RootProviderProps {
  value: UnwrapRef<UsePinInputReturn>
}

export interface PinInputRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { PinInputProvider } from './use-pin-input-context'

const props = defineProps<PinInputRootProviderProps>()
const pinInput = computed(() => props.value)

PinInputProvider(pinInput)
</script>

<template>
  <ark.div v-bind="pinInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
