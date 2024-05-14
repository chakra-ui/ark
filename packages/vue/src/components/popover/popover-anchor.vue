<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface PopoverAnchorProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverAnchorProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.anchorProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
