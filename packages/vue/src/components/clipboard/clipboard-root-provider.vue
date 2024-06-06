<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseClipboardReturn } from './use-clipboard'

interface RootProviderProps {
  value: UnwrapRef<UseClipboardReturn>
}

export interface ClipboardRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { ClipboardProvider } from './use-clipboard-context'

const props = defineProps<ClipboardRootProviderProps>()
const clipboard = computed(() => props.value)

ClipboardProvider(clipboard)
</script>

<template>
  <ark.div v-bind="clipboard.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
