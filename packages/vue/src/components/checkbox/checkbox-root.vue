<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './checkbox.types'

export interface CheckboxRootBaseProps extends RootProps, PolymorphicProps {}
export interface CheckboxRootProps
  extends CheckboxRootBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
export interface CheckboxRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckbox } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

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
</script>

<template>
  <ark.label v-bind="checkbox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
