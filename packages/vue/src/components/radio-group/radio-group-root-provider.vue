<script lang="ts">
import type { RootState } from '@zag-js/radio-group'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseRadioGroupReturn } from './use-radio-group.ts'

interface RootProviderProps {
  value: UnwrapRef<UseRadioGroupReturn>
}

export interface RadioGroupRootProviderState extends RootState {}
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

defineSlots<PolymorphicSlots<RadioGroupRootProviderState>>()
const radioGroup = computed(() => props.value)

RadioGroupProvider(radioGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="radioGroup.getRootProps()" :state="radioGroup.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
