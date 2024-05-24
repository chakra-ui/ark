<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { RootEmits, RootProps } from './clipboard.types'

export interface ClipboardRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ClipboardRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
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
