<script setup lang="ts">
import { ScrollArea } from '@ark-ui/vue/scroll-area'
import styles from 'styles/scroll-area.module.css'
</script>

<template>
  <ScrollArea.Root :class="styles.Root" :style="{ height: 'auto' }">
    <ScrollArea.Viewport :class="styles.Viewport">
      <ScrollArea.Content :class="styles.Content">
        <p :class="styles.Paragraph" :style="{ width: '50vw' }">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="horizontal" :class="styles.Scrollbar">
      <ScrollArea.Thumb :class="styles.Thumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner :class="styles.Corner" />
  </ScrollArea.Root>
</template>
