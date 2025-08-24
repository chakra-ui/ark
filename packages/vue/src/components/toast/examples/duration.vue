<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { XIcon, ClockIcon } from 'lucide-vue-next'

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
        @click="
          toaster.create({
            title: `Toast (${duration.label})`,
            description: `This toast will ${
              duration.value === Infinity ? 'stay until dismissed' : `disappear in ${duration.label}`
            }.`,
            type: 'info',
            duration: duration.value,
          })
        "
      >
        {{ duration.label }}
      </button>
    </div>

    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <div style="display: flex; align-items: flex-start; gap: 12px">
          <ClockIcon />
          <div style="flex: 1">
            <Toast.Title>{{ toast.title }}</Toast.Title>
            <Toast.Description>{{ toast.description }}</Toast.Description>
          </div>
          <Toast.CloseTrigger>
            <XIcon />
          </Toast.CloseTrigger>
        </div>
      </Toast.Root>
    </Toaster>
  </div>
</template>
