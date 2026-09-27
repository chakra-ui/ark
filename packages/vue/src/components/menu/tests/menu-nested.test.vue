<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Menu } from '@ark-ui/vue/menu'

defineProps<{ dialogOpen: boolean }>()
const emit = defineEmits<{ requestDismiss: [event: CustomEvent] }>()
</script>

<template>
  <Dialog.Root :open="dialogOpen">
    <Dialog.Positioner>
      <Dialog.Content>
        <Menu.Root @request-dismiss="emit('requestDismiss', $event)">
          <Menu.Trigger>click me</Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="edit">Edit</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
