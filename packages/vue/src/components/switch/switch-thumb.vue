<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SwitchThumbBaseProps extends PolymorphicProps {}
export interface SwitchThumbProps
  extends SwitchThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSwitchContext } from './use-switch-context'
import { useForwardExpose } from '../../utils'

defineProps<SwitchThumbProps>()
const context = useSwitchContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="context.getThumbProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
