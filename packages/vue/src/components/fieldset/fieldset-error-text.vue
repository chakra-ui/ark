<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldsetErrorTextBaseProps extends PolymorphicProps {}
export interface FieldsetErrorTextProps
  extends FieldsetErrorTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldsetContext } from './use-fieldset-context'

defineProps<FieldsetErrorTextProps>()
const fieldset = useFieldsetContext()

useForwardExpose()
</script>

<template>
  <ark.span v-if="fieldset.invalid" v-bind="fieldset.getErrorTextProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
