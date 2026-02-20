<script setup lang="ts">
import { Drawer } from '@ark-ui/vue/drawer'
import { XIcon } from 'lucide-vue-next'
import styles from 'styles/drawer.module.css'
</script>

<template>
  <Drawer.Root :snap-points="[0.25, 0.5, 1]" :default-active-snap-point="0.5">
    <Drawer.Trigger :class="styles.Trigger">Open</Drawer.Trigger>
    <Drawer.Backdrop :class="styles.Backdrop" />
    <Drawer.Positioner :class="styles.Positioner">
      <Drawer.Content :class="styles.Content">
        <Drawer.Grabber :class="styles.Grabber">
          <Drawer.GrabberIndicator :class="styles.GrabberIndicator" />
        </Drawer.Grabber>
        <Drawer.Title :class="styles.Title">Drawer with Snap Points</Drawer.Title>
        <p>This drawer has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
        <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
        <Drawer.CloseTrigger :class="styles.CloseTrigger">
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
</template>
