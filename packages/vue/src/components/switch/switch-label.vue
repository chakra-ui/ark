<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SwitchLabelBaseProps extends PolymorphicProps {}
export interface SwitchLabelProps
  extends SwitchLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSwitchContext } from './use-switch-context'
import { useForwardExpose } from '../../utils'

defineProps<SwitchLabelProps>()
const context = useSwitchContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="context.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
