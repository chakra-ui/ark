<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

interface Item {
  id: string
  label: string
  detail: string
}

const items: Item[] = [
  { id: 'share', label: 'Share', detail: 'Share this item with others via link or email.' },
  { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
  { id: 'archive', label: 'Archive', detail: 'Move this item to the archive for later reference.' },
]

const activeItem = ref<Item | null>(null)
</script>

<template>
  <Popover.Root @trigger-value-change="(e) => (activeItem = items.find((i) => i.id === e.value) ?? null)">
    <div :class="button.Group">
      <Popover.Trigger v-for="item in items" :key="item.id" :value="item.id" :class="button.Root">
        {{ item.label }}
      </Popover.Trigger>
    </div>
    <Teleport to="body">
      <Popover.Positioner :class="styles.Positioner">
        <Popover.Content :class="styles.Content">
          <Popover.Title :class="styles.Title">{{ activeItem?.label ?? 'Select an action' }}</Popover.Title>
          <Popover.Description :class="styles.Description">
            {{ activeItem?.detail ?? 'Click a button above' }}
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
