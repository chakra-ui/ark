<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectItemGroupLabelBaseProps extends PolymorphicProps {}
export interface SelectItemGroupLabelProps
  extends
    SelectItemGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useSelectItemGroupPropsContext } from './use-select-item-group-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectItemGroupLabelProps>()

const select = useSelectContext()
const itemGroupProps = useSelectItemGroupPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getItemGroupLabelProps({ htmlFor: itemGroupProps.id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>
