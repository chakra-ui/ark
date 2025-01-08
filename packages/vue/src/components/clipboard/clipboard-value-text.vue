<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ClipboardValueTextBaseProps extends PolymorphicProps {}
export interface ClipboardValueTextProps
  extends ClipboardValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

defineProps<ClipboardValueTextProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.span :as-child="asChild">
    <slot>{{ clipboard.value }}</slot>
  </ark.span>
</template>
