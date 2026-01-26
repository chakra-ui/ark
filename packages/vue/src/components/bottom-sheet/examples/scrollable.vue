<script setup lang="ts">
import { BottomSheet } from '@ark-ui/vue/bottom-sheet'
import { XIcon } from 'lucide-vue-next'
import styles from 'styles/bottom-sheet.module.css'
</script>

<template>
  <BottomSheet.Root>
    <BottomSheet.Trigger :class="styles.Trigger">Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop :class="styles.Backdrop" />
    <BottomSheet.Content :class="styles.Content">
      <BottomSheet.Grabber :class="styles.Grabber">
        <BottomSheet.GrabberIndicator :class="styles.GrabberIndicator" />
      </BottomSheet.Grabber>
      <BottomSheet.Title :class="styles.Title">Scrollable Bottom Sheet</BottomSheet.Title>
      <BottomSheet.CloseTrigger :class="styles.CloseTrigger">
        <XIcon />
      </BottomSheet.CloseTrigger>
      <div :class="styles.Scrollable">
        <div v-for="index in 50" :key="index" :class="styles.ScrollableItem">Item {{ index }}</div>
      </div>
    </BottomSheet.Content>
  </BottomSheet.Root>
</template>
