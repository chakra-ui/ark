<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { X } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '∞', value: Infinity },
]
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      <button
        v-for="duration in durations"
        :key="duration.label"
        type="button"
        :class="button.Root"
        @click="
          toaster.create({
            title: `Duration: ${duration.label}`,
            description:
              duration.value === Infinity
                ? 'This toast will stay until you dismiss it.'
                : `This toast will automatically close in ${duration.label}.`,
            type: 'info',
            duration: duration.value,
          })
        "
      >
        {{ duration.label }}
      </button>
    </div>

    <Teleport to="body">
      <Toaster :toaster="toaster" v-slot="toast">
        <Toast.Root :class="styles.Root">
          <Toast.Title :class="styles.Title">{{ toast.title }}</Toast.Title>
          <Toast.Description :class="styles.Description">{{ toast.description }}</Toast.Description>
          <Toast.CloseTrigger :class="styles.CloseTrigger">
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      </Toaster>
    </Teleport>
  </div>
</template>
