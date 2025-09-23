<script setup lang="ts">
import { BottomSheet } from '@ark-ui/vue/bottom-sheet'
</script>

<template>
  <BottomSheet.Root modal>
    <BottomSheet.Trigger>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop />
    <BottomSheet.Content>
      <BottomSheet.Grabber>
        <BottomSheet.GrabberIndicator />
      </BottomSheet.Grabber>
      <BottomSheet.Title>Modal Bottom Sheet</BottomSheet.Title>
      <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
</template>
