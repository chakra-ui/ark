<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface PopoverCloseTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverCloseTriggerProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.button v-bind="popover.closeTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
