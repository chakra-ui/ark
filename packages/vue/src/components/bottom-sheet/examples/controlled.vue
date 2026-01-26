<script setup lang="ts">
import { BottomSheet } from '@ark-ui/vue/bottom-sheet'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/bottom-sheet.module.css'

const open = ref(false)
</script>

<template>
  <button :class="button.Root" @click="open = !open">{{ open ? 'Close' : 'Open' }} Bottom Sheet</button>

  <BottomSheet.Root v-model:open="open">
    <BottomSheet.Backdrop :class="styles.Backdrop" />
    <BottomSheet.Content :class="styles.Content">
      <BottomSheet.Grabber :class="styles.Grabber">
        <BottomSheet.GrabberIndicator :class="styles.GrabberIndicator" />
      </BottomSheet.Grabber>
      <BottomSheet.Title :class="styles.Title">Controlled Bottom Sheet</BottomSheet.Title>
      <p>This bottom sheet is controlled via state.</p>
      <BottomSheet.CloseTrigger :class="styles.CloseTrigger">
        <XIcon />
      </BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
</template>
