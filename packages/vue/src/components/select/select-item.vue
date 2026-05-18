<script lang="ts">
import type { ItemProps } from '@zag-js/select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectItemBaseProps extends ItemProps, PolymorphicProps {}
export interface SelectItemProps
  extends
    SelectItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { SelectItemProvider } from './use-select-item-context.ts'
import { SelectItemPropsProvider } from './use-select-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SelectItemProps>()
const select = useSelectContext()

SelectItemPropsProvider(props)
SelectItemProvider(computed(() => select.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
