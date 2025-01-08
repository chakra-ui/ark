<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ClipboardTriggerBaseProps extends PolymorphicProps {}
export interface ClipboardTriggerProps
  extends ClipboardTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

defineProps<ClipboardTriggerProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="clipboard.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
