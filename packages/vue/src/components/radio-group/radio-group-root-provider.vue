<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseRadioGroupReturn } from './use-radio-group.ts'

interface RootProviderProps {
  value: UnwrapRef<UseRadioGroupReturn>
}

export interface RadioGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface RadioGroupRootProviderProps
  extends
    RadioGroupRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { RadioGroupProvider } from './use-radio-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<RadioGroupRootProviderProps>()
const radioGroup = computed(() => props.value)

RadioGroupProvider(radioGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="radioGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
