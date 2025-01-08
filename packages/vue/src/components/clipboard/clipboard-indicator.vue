<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ClipboardIndicatorBaseProps extends PolymorphicProps {}
export interface ClipboardIndicatorProps
  extends ClipboardIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'
import { useForwardExpose } from '../../utils'

defineProps<ClipboardIndicatorProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="clipboard.getIndicatorProps({ copied: clipboard.copied })" :as-child="asChild">
    <slot name="copied" v-if="clipboard.copied" />
    <slot v-else />
  </ark.div>
</template>
