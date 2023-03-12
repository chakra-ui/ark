<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  ToastProvider,
  ToastPlacements,
  ToastGroup,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
} from '../'
import type { ToastsContext } from '../toast-group'
import type { PlacementsContext } from '../toast-placements'

const placementsRef = ref<PlacementsContext>()

const groupRef = ref<ToastsContext[]>()
</script>
<template>
  <ToastProvider>
    <ToastPlacements ref="placementsRef">
      <ToastGroup
        ref="groupRef"
        v-for="(placement, placementIdx) in placementsRef?.placements"
        :key="placementIdx"
        :placement="placement"
      >
        <Toast v-for="toast in groupRef?.[placementIdx].toasts" :key="toast.id" :toast="toast">
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
