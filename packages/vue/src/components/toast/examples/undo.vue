<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
})

const files = ref([
  { id: 'report', name: 'Q4 report.pdf' },
  { id: 'notes', name: 'Meeting notes.md' },
  { id: 'budget', name: 'Budget.xlsx' },
])

const archive = (id: string) => {
  const item = files.value.find((file) => file.id === id)
  if (!item) return

  files.value = files.value.filter((file) => file.id !== id)
  toaster.create({
    title: 'File archived',
    description: item.name,
    type: 'info',
    action: {
      label: 'Undo',
      onClick: () => {
        if (!files.value.some((file) => file.id === item.id)) {
          files.value = [item, ...files.value]
        }
      },
    },
  })
}
</script>

<template>
  <div class="stack">
    <div v-for="file in files" :key="file.id" class="hstack">
      <span>{{ file.name }}</span>
      <button type="button" :class="button.Root" @click="archive(file.id)">Archive</button>
    </div>
    <p v-if="files.length === 0">No files</p>
    <Teleport to="body">
      <Toaster :toaster="toaster" v-slot="toast">
        <Toast.Root :class="styles.Root">
          <Toast.Title :class="styles.Title">{{ toast.title }}</Toast.Title>
          <Toast.Description :class="styles.Description">{{ toast.description }}</Toast.Description>
          <Toast.ActionTrigger v-if="toast.action" :class="styles.ActionTrigger">
            {{ toast.action?.label }}
          </Toast.ActionTrigger>
          <Toast.CloseTrigger :class="styles.CloseTrigger">
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      </Toaster>
    </Teleport>
  </div>
</template>
