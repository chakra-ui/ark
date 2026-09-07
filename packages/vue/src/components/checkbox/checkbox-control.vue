<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CheckboxControlBaseProps extends PolymorphicProps {}
export interface CheckboxControlProps
  extends
    CheckboxControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCheckboxContext } from './use-checkbox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CheckboxControlProps>()
const checkbox = useCheckboxContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="checkbox.getControlProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
