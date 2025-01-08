<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ClipboardLabelBaseProps extends PolymorphicProps {}
export interface ClipboardLabelProps
  extends ClipboardLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'
import { useForwardExpose } from '../../utils'

defineProps<ClipboardLabelProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="clipboard.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
