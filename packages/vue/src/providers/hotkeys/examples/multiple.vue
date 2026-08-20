<script setup lang="ts">
import { useFormatHotkey, useHotkeys, usePlatform } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: '02-save', hotkey: 'mod+S', label: 'Save', category: 'File' },
  { id: '02-undo', hotkey: 'mod+Z', label: 'Undo', category: 'Edit' },
  { id: '02-redo', hotkey: 'mod+shift+Z', label: 'Redo', category: 'Edit' },
]

const lastFired = ref<string | null>(null)
const platform = usePlatform()
const formatHotkey = useFormatHotkey()

useHotkeys(
  commands.map((command) => ({
    ...command,
    action: () => {
      lastFired.value = command.id
    },
  })),
)
</script>

<template>
  <div :class="styles.Panel">
    <div :class="styles.Toolbar">
      <span :class="styles.SectionLabel">Detected platform</span>
      <span :class="styles.Badge">{{ platform }}</span>
    </div>
    <ul :class="styles.List">
      <li
        v-for="command in commands"
        :key="command.id"
        :class="styles.Row"
        :data-fired="command.id === lastFired ? '' : undefined"
      >
        <span>{{ command.label }}</span>
        <kbd :class="styles.Kbd" :data-active="command.id === lastFired ? '' : undefined">
          {{ formatHotkey(command.hotkey) }}
        </kbd>
      </li>
    </ul>
  </div>
</template>
