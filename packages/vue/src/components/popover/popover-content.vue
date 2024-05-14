<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface PopoverContentProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverContentProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
