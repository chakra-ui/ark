<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldHelperTextBaseProps extends PolymorphicProps {}
export interface FieldHelperTextProps
  extends
    FieldHelperTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldHelperTextProps>()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="field.getHelperTextProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
