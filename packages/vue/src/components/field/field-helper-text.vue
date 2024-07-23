<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldHelperTextBaseProps extends PolymorphicProps {}
export interface FieldHelperTextProps
  extends FieldHelperTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

defineProps<FieldHelperTextProps>()
const field = useFieldContext()
</script>

<template>
  <ark.span v-bind="field.getHelperTextProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
