<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectItemTextBaseProps extends PolymorphicProps {}
export interface SelectItemTextProps
  extends SelectItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'
import { useForwardExpose } from '../../utils'

defineProps<SelectItemTextProps>()

const select = useSelectContext()
const itemProps = useSelectItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="select.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
