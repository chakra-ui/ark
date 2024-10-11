<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './switch.types'

export interface SwitchRootBaseProps extends RootProps, PolymorphicProps {}
export interface SwitchRootProps
  extends SwitchRootBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
export interface SwitchRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSwitch } from './use-switch'
import { SwitchProvider } from './use-switch-context'
import { useForwardExpose } from '../../utils'

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
