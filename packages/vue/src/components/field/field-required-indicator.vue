<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps {}

export interface FieldRequiredIndicatorProps
  extends FieldRequiredIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'
import { useForwardExpose } from '../../utils'

defineProps<FieldRequiredIndicatorProps>()

const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.span v-if="field.required" v-bind="field.getRequiredIndicatorProps()" :as-child="asChild">
    <slot>*</slot>
  </ark.span>
  <slot v-else name="fallback"></slot>
</template>
