<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ClipboardInputBaseProps extends PolymorphicProps {}
export interface ClipboardInputProps
  extends ClipboardInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'
import { useForwardExpose } from '../../utils'

defineProps<ClipboardInputProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="clipboard.getInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
