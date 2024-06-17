<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseRadioGroupReturn } from './use-radio-group'

interface RootProviderProps {
  value: UnwrapRef<UseRadioGroupReturn>
}

export interface RadioGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface RadioGroupRootProviderProps
  extends RadioGroupRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { RadioGroupProvider } from './use-radio-group-context'

const props = defineProps<RadioGroupRootProviderProps>()
const radioGroup = computed(() => props.value)

RadioGroupProvider(radioGroup)
</script>

<template>
  <ark.div v-bind="radioGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
