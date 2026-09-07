<script lang="ts">
import type { RootState } from '@zag-js/radio-group'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './radio-group.types.ts'

export interface RadioGroupRootState extends RootState {}
export interface RadioGroupRootBaseProps extends RootProps, PolymorphicProps {}
export interface RadioGroupRootProps
  extends
    RadioGroupRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface RadioGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useRadioGroup } from './use-radio-group.ts'
import { RadioGroupProvider } from './use-radio-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

defineSlots<PolymorphicSlots<RadioGroupRootState>>()

const emits = defineEmits<RadioGroupRootEmits>()

const radioGroup = useRadioGroup(props, emits)
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
