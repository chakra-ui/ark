<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './switch.types'

export interface SwitchRootProps extends RootProps, PolymorphicProps {}
export interface SwitchRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useSwitch } from './use-switch'
import { SwitchProvider } from './use-switch-context'

const defaults: BooleanDefaults<RootProps> = {
  checked: undefined,
  defaultChecked: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
}
const props = withDefaults(defineProps<SwitchRootProps>(), defaults)
const emits = defineEmits<SwitchRootEmits>()

const context = useSwitch(props, emits)
SwitchProvider(context)
</script>

<template>
  <ark.label v-bind="context.rootProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
