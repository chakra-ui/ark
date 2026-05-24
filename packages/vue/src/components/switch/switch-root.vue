<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './switch.types.ts'

export interface SwitchRootBaseProps extends RootProps, PolymorphicProps {}
export interface SwitchRootProps
  extends
    SwitchRootBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
export interface SwitchRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSwitch } from './use-switch.ts'
import { SwitchProvider } from './use-switch-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<SwitchRootProps>(), {
  checked: undefined,
  defaultChecked: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<SwitchRootEmits>()

const context = useSwitch(props, emits)
SwitchProvider(context)

useForwardExpose()
</script>

<template>
  <ark.label v-bind="context.getRootProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
