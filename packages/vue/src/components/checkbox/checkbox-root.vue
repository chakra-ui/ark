<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './checkbox.types.ts'

export interface CheckboxRootBaseProps extends RootProps, PolymorphicProps {}
export interface CheckboxRootProps
  extends
    CheckboxRootBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
export interface CheckboxRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCheckbox } from './use-checkbox.ts'
import { CheckboxProvider } from './use-checkbox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  checked: undefined,
  defaultChecked: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<CheckboxRootEmits>()

const checkbox = useCheckbox(props, emits)
CheckboxProvider(checkbox)

useForwardExpose()
</script>

<template>
  <ark.label v-bind="checkbox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
