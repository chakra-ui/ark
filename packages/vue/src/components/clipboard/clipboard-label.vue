<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ClipboardLabelBaseProps extends PolymorphicProps {}
export interface ClipboardLabelProps
  extends
    ClipboardLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ClipboardLabelProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="clipboard.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
