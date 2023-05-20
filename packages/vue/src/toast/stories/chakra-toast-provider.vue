<script setup lang="ts">
import {
  ToastPlacements,
  ToastGroup,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
  ToastProvider,
} from '../'
</script>
<template>
  <ToastProvider>
    <ToastPlacements v-slot="{ placements }">
      <ToastGroup
        v-for="(placement, placementIdx) in placements"
        :key="placementIdx"
        :placement="placement"
        v-slot="{ toasts }"
      >
        <Toast v-for="toast in toasts" :key="toast.id" :toast="toast">
          <ToastTitle />
          <ToastDescription />
          <ToastCloseTrigger>
            <button>Close</button>
          </ToastCloseTrigger>
        </Toast>
      </ToastGroup>
    </ToastPlacements>
    <slot></slot>
  </ToastProvider>
</template>
