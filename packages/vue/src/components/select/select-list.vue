<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectListBaseProps extends PolymorphicProps {}
export interface SelectListProps
  extends
    SelectListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectListProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getListProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
