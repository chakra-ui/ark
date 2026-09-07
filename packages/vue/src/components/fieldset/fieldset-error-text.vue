<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldsetErrorTextBaseProps extends PolymorphicProps {}
export interface FieldsetErrorTextProps
  extends
    FieldsetErrorTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldsetErrorTextProps>()
const fieldset = useFieldsetContext()

useForwardExpose()
</script>

<template>
  <ark.span v-if="fieldset.invalid" v-bind="fieldset.getErrorTextProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
