<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PopoverTitleProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverTitleProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.titleProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
