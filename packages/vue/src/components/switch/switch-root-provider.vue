<script lang="ts">
import type { LabelHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSwitchReturn } from './use-switch'

interface RootProviderProps {
  value: UnwrapRef<UseSwitchReturn>
}

export interface SwitchRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SwitchRootProviderProps
  extends SwitchRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { SwitchProvider } from './use-switch-context'
const props = defineProps<SwitchRootProviderProps>()
const api = computed(() => props.value)

SwitchProvider(api)

useForwardExpose()
</script>

<template>
  <ark.label v-bind="api.getRootProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
