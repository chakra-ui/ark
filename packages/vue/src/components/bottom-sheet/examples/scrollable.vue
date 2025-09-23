<script setup lang="ts">
import { BottomSheet } from '@ark-ui/vue/bottom-sheet'
</script>

<template>
  <BottomSheet.Root>
    <BottomSheet.Trigger>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop />
    <BottomSheet.Content>
      <BottomSheet.Grabber>
        <BottomSheet.GrabberIndicator />
      </BottomSheet.Grabber>
      <BottomSheet.Title>Bottom Sheet Title</BottomSheet.Title>
      <p>This is the content of the bottom sheet.</p>
      <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
      <div class="scrollable">
        <div v-for="(_element, index) in Array.from({ length: 100 })" :key="index">Item {{ index }}</div>
      </div>
    </BottomSheet.Content>
  </BottomSheet.Root>
</template>
