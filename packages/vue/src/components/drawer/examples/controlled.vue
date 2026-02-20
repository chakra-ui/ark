<script setup lang="ts">
import { Drawer } from '@ark-ui/vue/drawer'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/drawer.module.css'

const open = ref(false)
</script>

<template>
  <button :class="button.Root" @click="open = !open">{{ open ? 'Close' : 'Open' }} Drawer</button>

  <Drawer.Root v-model:open="open">
    <Drawer.Backdrop :class="styles.Backdrop" />
    <Drawer.Positioner :class="styles.Positioner">
      <Drawer.Content :class="styles.Content">
        <Drawer.Grabber :class="styles.Grabber">
          <Drawer.GrabberIndicator :class="styles.GrabberIndicator" />
        </Drawer.Grabber>
        <Drawer.Title :class="styles.Title">Controlled Drawer</Drawer.Title>
        <p>This drawer is controlled via state.</p>
        <Drawer.CloseTrigger :class="styles.CloseTrigger">
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
</template>
