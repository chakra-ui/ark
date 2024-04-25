<script lang="ts">
import type { RootEmits, RootProps } from './clipboard.types'

export interface ClipboardRootProps extends RootProps, PolimoprhicProps {}
export interface ClipboardRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolimoprhicProps } from '../factory'
import { useClipboard } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

const props = defineProps<ClipboardRootProps>()
const emits = defineEmits<ClipboardRootEmits>()

const clipboard = useClipboard(props, emits)
ClipboardProvider(clipboard)
</script>

<template>
  <ark.div v-bind="clipboard.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

