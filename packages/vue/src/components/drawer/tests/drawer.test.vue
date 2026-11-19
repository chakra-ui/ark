<script setup lang="ts">
import { Drawer, type DrawerRootEmits, type DrawerRootProps } from '@ark-ui/vue/drawer'
import { useForwardPropsEmits } from '@ark-ui/vue'

const props = defineProps<DrawerRootProps>()
const emits = defineEmits<DrawerRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Drawer.Root v-bind="localProps">
    <Drawer.Trigger>Open Drawer</Drawer.Trigger>
    <Teleport to="body">
      <Drawer.Backdrop />
      <Drawer.Positioner data-testid="positioner">
        <Drawer.Content>
          <Drawer.Grabber data-testid="grabber">
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Description>Drawer Description</Drawer.Description>
          <Drawer.CloseTrigger>Close</Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Teleport>
  </Drawer.Root>
</template>
