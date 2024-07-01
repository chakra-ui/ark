<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldErrorTextBaseProps extends PolymorphicProps {}
export interface FieldErrorTextProps
  extends FieldErrorTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'
import { fieldAnatomy } from './field.anatomy'

defineProps<FieldErrorTextProps>()
const field = useFieldContext()
const part = fieldAnatomy.build().errorText
</script>

<template>
  <ark.span
    v-if="field.invalid"
    v-bind="field.getErrorTextProps()"
    :data-scope="part.attrs['data-scope']"
    :data-part="part.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.span>
</template>
