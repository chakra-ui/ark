<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseClipboardReturn } from './use-clipboard'

interface RootProviderProps {
  value: UnwrapRef<UseClipboardReturn>
}

export interface ClipboardRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ClipboardRootProviderProps
  extends ClipboardRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { ClipboardProvider } from './use-clipboard-context'
const props = defineProps<ClipboardRootProviderProps>()
const clipboard = computed(() => props.value)

ClipboardProvider(clipboard)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="clipboard.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
