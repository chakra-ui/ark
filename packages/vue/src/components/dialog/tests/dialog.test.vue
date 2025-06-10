<script setup lang="ts">
import { Dialog, type DialogRootEmits, type DialogRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog.Root v-bind="localProps">
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner data-testid="positioner">
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
