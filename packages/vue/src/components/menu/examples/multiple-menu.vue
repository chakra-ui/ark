<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/menu.module.css'

const fileItems = [
  { label: 'New File', value: 'new' },
  { label: 'Open...', value: 'open' },
  { label: 'Save', value: 'save' },
]

const editItems = [
  { label: 'Undo', value: 'undo' },
  { label: 'Redo', value: 'redo' },
  { label: 'Cut', value: 'cut' },
  { label: 'Copy', value: 'copy' },
]
</script>

<template>
  <div style="display: flex; gap: 0.5rem">
    <Menu.Root id="file">
      <Menu.Trigger :class="styles.Trigger">
        File
        <Menu.Indicator :class="styles.Indicator">
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Item v-for="item in fileItems" :key="item.value" :class="styles.Item" :value="item.value">
            {{ item.label }}
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>

    <Menu.Root id="edit">
      <Menu.Trigger :class="styles.Trigger">
        Edit
        <Menu.Indicator :class="styles.Indicator">
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Item v-for="item in editItems" :key="item.value" :class="styles.Item" :value="item.value">
            {{ item.label }}
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  </div>
</template>
