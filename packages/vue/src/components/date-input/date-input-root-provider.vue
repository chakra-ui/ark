<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseDateInputReturn } from './use-date-input.ts'

interface RootProviderProps {
  value: UnwrapRef<UseDateInputReturn>
}

export interface DateInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface DateInputRootProviderProps
  extends
    DateInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { DateInputProvider } from './use-date-input-context.ts'

const props = defineProps<DateInputRootProviderProps>()

const dateInput = computed(() => props.value)

DateInputProvider(dateInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="dateInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
