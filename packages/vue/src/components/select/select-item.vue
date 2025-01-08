<script lang="ts">
import type { ItemProps } from '@zag-js/select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectItemBaseProps extends ItemProps, PolymorphicProps {}
export interface SelectItemProps
  extends SelectItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemProvider } from './use-select-item-context'
import { SelectItemPropsProvider } from './use-select-item-props-context'

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
