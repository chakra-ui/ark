<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseDateInputReturn } from './use-date-input'

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
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { DateInputProvider } from './use-date-input-context'

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
