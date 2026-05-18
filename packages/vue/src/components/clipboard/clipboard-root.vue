<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './clipboard.types.ts'

export interface ClipboardRootBaseProps extends RootProps, PolymorphicProps {}
export interface ClipboardRootProps
  extends
    ClipboardRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ClipboardRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useClipboard } from './use-clipboard.ts'
import { ClipboardProvider } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ClipboardRootProps>()
const emits = defineEmits<ClipboardRootEmits>()

const clipboard = useClipboard(props, emits)
ClipboardProvider(clipboard)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="clipboard.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
