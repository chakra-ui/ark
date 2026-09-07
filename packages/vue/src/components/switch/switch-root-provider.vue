<script lang="ts">
import type { RootState } from '@zag-js/switch'
import type { LabelHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseSwitchReturn } from './use-switch.ts'

interface RootProviderProps {
  value: UnwrapRef<UseSwitchReturn>
}

export interface SwitchRootProviderState extends RootState {}
export interface SwitchRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SwitchRootProviderProps
  extends
    SwitchRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { SwitchProvider } from './use-switch-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SwitchRootProviderProps>()

defineSlots<PolymorphicSlots<SwitchRootProviderState>>()
const api = computed(() => props.value)

SwitchProvider(api)

useForwardExpose()
</script>

<template>
  <ark.label v-bind="api.getRootProps()" :state="api.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
