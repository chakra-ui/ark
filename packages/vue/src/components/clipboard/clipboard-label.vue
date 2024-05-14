<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ClipboardLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

defineProps<ClipboardLabelProps>()
const clipboard = useClipboardContext()
</script>

<template>
  <ark.label v-bind="clipboard.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
