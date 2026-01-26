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
      <BottomSheet.Title :class="styles.Title">Bottom Sheet Title</BottomSheet.Title>
      <p data-no-drag>This is the no drag area of the bottom sheet.</p>
      <BottomSheet.CloseTrigger :class="styles.CloseTrigger">
        <XIcon />
      </BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
</template>
