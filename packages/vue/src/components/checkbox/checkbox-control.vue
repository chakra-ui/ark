<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CheckboxControlBaseProps extends PolymorphicProps {}
export interface CheckboxControlProps
  extends CheckboxControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

defineProps<CheckboxControlProps>()
const checkbox = useCheckboxContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="checkbox.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
