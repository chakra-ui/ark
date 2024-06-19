<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectIndicatorBaseProps extends PolymorphicProps {}
export interface SelectIndicatorProps
  extends SelectIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectIndicatorProps>()
const select = useSelectContext()
</script>

<template>
  <ark.div v-bind="select.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
