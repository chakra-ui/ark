<script lang="ts">
import type { RootEmits, RootProps } from './switch.types'

export interface SwitchRootProps extends RootProps, PolymorphicProps {}
export interface SwitchRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useSwitch } from './use-switch'
import { SwitchProvider } from './use-switch-context'

const props = defineProps<SwitchRootProps>()
const emits = defineEmits<SwitchRootEmits>()

const context = useSwitch(props, emits)
SwitchProvider(context)
</script>

<template>
  <ark.label v-bind="context.rootProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
