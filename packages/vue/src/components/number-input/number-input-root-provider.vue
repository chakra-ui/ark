<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseNumberInputReturn } from './use-number-input'

interface RootProviderProps {
  value: UnwrapRef<UseNumberInputReturn>
}

export interface NumberInputRootProviderProps
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
import { NumberInputProvider } from './use-number-input-context'

const props = defineProps<NumberInputRootProviderProps>()
const numberInput = computed(() => props.value)

NumberInputProvider(numberInput)
</script>

<template>
  <ark.div v-bind="numberInput.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
