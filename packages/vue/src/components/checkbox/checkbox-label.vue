<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CheckboxLabelBaseProps extends PolymorphicProps {}
export interface CheckboxLabelProps
  extends
    CheckboxLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCheckboxContext } from './use-checkbox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CheckboxLabelProps>()
const checkbox = useCheckboxContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="checkbox.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
