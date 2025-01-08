<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ClipboardControlBaseProps extends PolymorphicProps {}
export interface ClipboardControlProps
  extends ClipboardControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

defineProps<ClipboardControlProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="clipboard.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
