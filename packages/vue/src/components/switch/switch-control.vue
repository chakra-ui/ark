<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SwitchControlBaseProps extends PolymorphicProps {}
export interface SwitchControlProps
  extends SwitchControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

defineProps<SwitchControlProps>()
const context = useSwitchContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="context.getControlProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
