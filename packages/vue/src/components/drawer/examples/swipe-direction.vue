<script setup lang="ts">
import { Drawer } from '@ark-ui/vue/drawer'
import { XIcon } from 'lucide-vue-next'
import styles from 'styles/drawer.module.css'
</script>

<template>
  <Drawer.Root swipeDirection="right">
    <Drawer.Trigger :class="styles.Trigger">Open Right</Drawer.Trigger>
    <Drawer.Backdrop :class="styles.Backdrop" />
    <Drawer.Positioner :class="styles.Positioner">
      <Drawer.Content :class="styles.Content">
        <Drawer.Title :class="styles.Title">Right Drawer</Drawer.Title>
        <p>This drawer slides in from the right side.</p>
        <Drawer.CloseTrigger :class="styles.CloseTrigger">
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
</template>
