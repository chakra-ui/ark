<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldsetHelperTextBaseProps extends PolymorphicProps {}
export interface FieldsetHelperTextProps
  extends FieldsetHelperTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldsetContext } from './use-fieldset-context'
import { useForwardExpose } from '../../utils'

defineProps<FieldsetHelperTextProps>()
const fieldset = useFieldsetContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="fieldset.getHelperTextProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
