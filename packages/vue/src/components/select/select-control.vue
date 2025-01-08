<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectControlBaseProps extends PolymorphicProps {}
export interface SelectControlProps
  extends SelectControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useForwardExpose } from '../../utils'

defineProps<SelectControlProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
