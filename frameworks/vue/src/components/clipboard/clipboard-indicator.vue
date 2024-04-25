<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ClipboardIndicatorProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

defineProps<ClipboardIndicatorProps>()
const clipboard = useClipboardContext()
</script>

<template>
  <ark.div v-bind="clipboard.getIndicatorProps({ copied: clipboard.copied })" :as-child="asChild">
    <slot name="copied" v-if="clipboard.copied" />
    <slot v-else />
  </ark.div>
</template>
