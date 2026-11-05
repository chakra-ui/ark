<script lang="ts">
import type { ItemProps } from '@zag-js/cascade-select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectItemBaseProps extends ItemProps, PolymorphicProps {}
export interface CascadeSelectItemProps
  extends
    CascadeSelectItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { CascadeSelectItemProvider } from './use-cascade-select-item-context'
import { CascadeSelectItemPropsProvider } from './use-cascade-select-item-props-context'

const props = defineProps<CascadeSelectItemProps>()
const cascadeSelect = useCascadeSelectContext()

CascadeSelectItemPropsProvider(props)
CascadeSelectItemProvider(computed(() => cascadeSelect.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="cascadeSelect.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
