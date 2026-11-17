<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Popover } from '@ark-ui/vue/popover'

defineProps<{ dialogOpen: boolean }>()
const emit = defineEmits<{ requestDismiss: [event: CustomEvent] }>()
</script>

<template>
  <Dialog.Root :open="dialogOpen">
    <Dialog.Positioner>
      <Dialog.Content>
        <Popover.Root @request-dismiss="emit('requestDismiss', $event)">
          <Popover.Trigger>click me</Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content>popover content</Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
