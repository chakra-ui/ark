<script lang="ts">
import type { RootState } from '@zag-js/field'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './field.types.ts'

export interface FieldRootState extends RootState {}
export interface FieldRootBaseProps extends RootProps, PolymorphicProps {}
export interface FieldRootProps
  extends
    FieldRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface FieldRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useField } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'

const props = withDefaults(defineProps<FieldRootProps>(), {
  disabled: undefined,
  dirty: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  touched: undefined,
} satisfies BooleanDefaults<RootProps>)

defineSlots<PolymorphicSlots<FieldRootState>>()

const emit = defineEmits<FieldRootEmits>()

const field = useField(props, emit)
FieldProvider(field)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="field.getRootProps()" :state="field.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
