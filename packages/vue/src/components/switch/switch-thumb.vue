<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SwitchThumbBaseProps extends PolymorphicProps {}
export interface SwitchThumbProps
  extends
    SwitchThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSwitchContext } from './use-switch-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SwitchThumbProps>()
const context = useSwitchContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="context.getThumbProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
