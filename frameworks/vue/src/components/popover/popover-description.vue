<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PopoverDescriptionProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverDescriptionProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.descriptionProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
