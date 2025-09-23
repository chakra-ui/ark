<script setup>
import { BottomSheet } from '@ark-ui/vue/bottom-sheet'
</script>

<template>
  <BottomSheet.Root :snap-points="[0.25, 0.5, 1]" :default-active-snap-point="0.5">
    <BottomSheet.Trigger>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop />
    <BottomSheet.Content>
      <BottomSheet.Grabber>
        <BottomSheet.GrabberIndicator />
      </BottomSheet.Grabber>
      <BottomSheet.Title>Bottom Sheet with Snap Points</BottomSheet.Title>
      <p>This bottom sheet has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
      <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
      <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
</template>
