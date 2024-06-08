<script lang="ts">
import type { LabelHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSwitchReturn } from './use-switch'

interface RootProviderProps {
  value: UnwrapRef<UseSwitchReturn>
}

export interface SwitchRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { SwitchProvider } from './use-switch-context'

const props = defineProps<SwitchRootProviderProps>()
const api = computed(() => props.value)

SwitchProvider(api)
</script>

<template>
  <ark.label v-bind="api.getRootProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
