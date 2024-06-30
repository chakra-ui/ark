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
import { fieldAnatomy } from './field.anatomy'

defineProps<FieldHelperTextProps>()
const field = useFieldContext()
const part = fieldAnatomy.build().helperText
</script>

<template>
  <ark.span
    v-bind="field.getHelperTextProps()"
    :data-scope="part.attrs['data-scope']"
    :data-part="part.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.span>
</template>
