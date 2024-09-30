<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectListBaseProps extends PolymorphicProps {}
export interface SelectListProps
  extends SelectListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useForwardExpose } from '../../utils'

defineProps<SelectListProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
