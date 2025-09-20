<script setup lang="ts">
import { BottomSheet } from '@ark-ui/vue/bottom-sheet'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen">{{ isOpen ? 'Close' : 'Open' }} Bottom Sheet</button>
    <p>Sheet is {{ isOpen ? 'Open' : 'Closed' }}</p>
  </div>
  <BottomSheet.Root v-model:open="isOpen">
    <BottomSheet.Backdrop />
    <BottomSheet.Content>
      <BottomSheet.Grabber>
        <BottomSheet.GrabberIndicator />
      </BottomSheet.Grabber>
      <BottomSheet.Title>Controlled Bottom Sheet</BottomSheet.Title>
      <p>This bottom sheet is controlled via state.</p>
      <button @click="isOpen = false">Close</button>
    </BottomSheet.Content>
  </BottomSheet.Root>
</template>
