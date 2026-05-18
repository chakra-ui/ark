<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ClipboardValueTextBaseProps extends PolymorphicProps {}
export interface ClipboardValueTextProps
  extends
    ClipboardValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ClipboardValueTextProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.span :as-child="asChild">
    <slot>{{ clipboard.value }}</slot>
  </ark.span>
</template>
