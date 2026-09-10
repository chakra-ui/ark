<script lang="ts">
import type { ScrollArrowProps } from '@zag-js/select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectScrollArrowBaseProps extends ScrollArrowProps, PolymorphicProps {}
export interface SelectScrollArrowProps
  extends
    SelectScrollArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SelectScrollArrowProps>()

const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getScrollArrowProps({ placement: props.placement })" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
