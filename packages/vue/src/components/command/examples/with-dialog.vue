<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Command, createListCollection } from '@ark-ui/vue/command'
import { Dialog } from '@ark-ui/vue/dialog'
import { useHotkey } from '@ark-ui/vue/hotkeys'
import {
  CornerDownLeftIcon,
  FilePlusIcon,
  FolderOpenIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  TerminalIcon,
} from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'new-file', label: 'New file', icon: FilePlusIcon, shortcut: '⌘N' },
    { value: 'open-file', label: 'Open file', icon: FolderOpenIcon, shortcut: '⌘O' },
    { value: 'save', label: 'Save', icon: SaveIcon, shortcut: '⌘S' },
    { value: 'terminal', label: 'Toggle terminal', icon: TerminalIcon, shortcut: '⌃`' },
    { value: 'settings', label: 'Open settings', icon: SettingsIcon, shortcut: '⌘,' },
  ],
})

const open = ref(false)
const lastRun = ref<string | null>(null)

useHotkey({
  hotkey: 'mod+K',
  action: () => {
    open.value = !open.value
  },
})

const handleSelect = (details: Command.SelectionDetails) => {
  lastRun.value = details.itemValue
  open.value = false
}
</script>

<template>
  <div class="stack">
    <output>Ran: {{ lastRun ?? 'nothing yet' }}</output>
    <Dialog.Root lazy-mount unmount-on-exit v-model:open="open">
      <Dialog.Trigger :class="button.Root">
        Search commands
        <kbd>⌘K</kbd>
      </Dialog.Trigger>
      <Teleport to="body">
        <Dialog.Backdrop :class="styles.Backdrop" />
        <Dialog.Positioner :class="styles.Positioner">
          <Dialog.Content :class="styles.Content" aria-label="Command palette">
            <Command.Root :class="styles.Root" :collection="collection" @select="handleSelect">
              <Command.Label :class="styles.Label">Commands</Command.Label>
              <Command.Control :class="styles.Control">
                <SearchIcon />
                <Command.Input :class="styles.Input" placeholder="Type a command or search..." />
              </Command.Control>
              <Command.Context v-slot="command">
                <Command.List :class="styles.List">
                  <Command.Item
                    v-for="item in command.collection.items"
                    :key="item.value"
                    :item="item"
                    :class="styles.Item"
                  >
                    <span :class="styles.ItemStart">
                      <component :is="item.icon" />
                      <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
                    </span>
                    <kbd :class="styles.Shortcut">{{ item.shortcut }}</kbd>
                  </Command.Item>
                </Command.List>
              </Command.Context>
              <Command.Empty :class="styles.Empty">No commands found</Command.Empty>
            </Command.Root>
            <div :class="styles.Footer">
              <span :class="styles.FooterHint">
                <kbd :class="styles.Shortcut">↑↓</kbd>
                Navigate
              </span>
              <span :class="styles.FooterHint">
                <kbd :class="styles.Shortcut"><CornerDownLeftIcon /></kbd>
                Run
              </span>
              <span :class="styles.FooterHint">
                <kbd :class="styles.Shortcut">esc</kbd>
                Close
              </span>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Teleport>
    </Dialog.Root>
  </div>
</template>
