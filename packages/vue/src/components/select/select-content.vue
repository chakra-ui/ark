<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectContentBaseProps extends PolymorphicProps {}
export interface SelectContentProps
  extends SelectContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectContentProps>()
const select = useSelectContext()
</script>

<template>
  <ark.div v-bind="select.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
