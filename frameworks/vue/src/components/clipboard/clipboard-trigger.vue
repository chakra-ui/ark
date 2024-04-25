<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ClipboardTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

defineProps<ClipboardTriggerProps>()
const clipboard = useClipboardContext()
</script>

<template>
  <ark.button v-bind="clipboard.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
