<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ClipboardInputProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

defineProps<ClipboardInputProps>()
const clipboard = useClipboardContext()
</script>

<template>
  <ark.div v-bind="clipboard.inputProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
