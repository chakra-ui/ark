<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectItemTextBaseProps extends PolymorphicProps {}
export interface CascadeSelectItemTextProps
  extends
    CascadeSelectItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

defineProps<CascadeSelectItemTextProps>()
const cascadeSelect = useCascadeSelectContext()
const itemProps = useCascadeSelectItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="cascadeSelect.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
