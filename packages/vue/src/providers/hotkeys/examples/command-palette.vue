<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { Dialog } from '@ark-ui/vue/dialog'
import { useFormatHotkey, useHotkey, useHotkeyRegistrations, useHotkeys } from '@ark-ui/vue/hotkeys'
import { useFilter } from '@ark-ui/vue/locale'
import { CornerDownLeftIcon, SearchIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/command-palette.module.css'

const open = ref(false)
const lastRun = ref<string | null>(null)

useHotkeys([
  {
    id: 'save',
    hotkey: 'mod+S',
    action: () => (lastRun.value = 'Save file'),
    label: 'Save file',
    category: 'File',
    keywords: ['write', 'persist'],
  },
  {
    id: 'theme',
    hotkey: 'mod+shift+D',
    action: () => (lastRun.value = 'Toggle theme'),
    label: 'Toggle theme',
    category: 'View',
    keywords: ['dark', 'light', 'appearance'],
  },
  {
    id: 'undo',
    hotkey: 'mod+Z',
    action: () => (lastRun.value = 'Undo'),
    label: 'Undo',
    category: 'Edit',
    keywords: ['revert', 'back'],
  },
])

const formatHotkey = useFormatHotkey()
const commands = useHotkeyRegistrations()
const filters = useFilter({ sensitivity: 'base' })

const { collection, filter, set } = useListCollection({
  initialItems: commands.value,
  itemToString: (item) => item.label ?? item.id,
  itemToValue: (item) => item.id,
  groupBy: (item) => item.category ?? 'Other',
  filter: (itemText, filterText, item) =>
    filters.value.contains(itemText, filterText) ||
    item.keywords.some((keyword) => filters.value.contains(keyword, filterText)),
})

watch(commands, (next) => set([...next]), { immediate: true })

const openPalette = () => {
  filter('')
  open.value = true
}

useHotkey('mod+K', openPalette, { label: 'Open command palette', category: 'General' })

const handleValueChange = (details: Combobox.ValueChangeDetails) => {
  const selected = details.items.at(0)
  if (!selected) return
  open.value = false
  selected.action(new KeyboardEvent('keydown'))
}
</script>

<template>
  <div>
    <button type="button" :class="button.Root" @click="openPalette">Open palette ({{ formatHotkey('mod+K') }})</button>
    <p>Last run: {{ lastRun ?? 'nothing yet' }}</p>

    <Dialog.Root lazy-mount unmount-on-exit :open="open" @open-change="(details) => (open = details.open)">
      <Teleport to="body">
        <Dialog.Backdrop :class="styles.Backdrop" />
        <Dialog.Positioner :class="styles.Positioner">
          <Dialog.Content :class="styles.Content" aria-label="Command palette">
            <Combobox.Root
              :class="styles.Root"
              :collection="collection"
              open
              disable-layer
              input-behavior="autohighlight"
              selection-behavior="preserve"
              :loop-focus="false"
              placeholder="Search commands…"
              @input-value-change="(details) => filter(details.inputValue)"
              @value-change="handleValueChange"
            >
              <Combobox.Control :class="styles.Control">
                <SearchIcon />
                <Combobox.Input :class="styles.Input" />
              </Combobox.Control>
              <Combobox.Content :class="styles.Content_list">
                <div v-if="collection.size === 0" :class="styles.Empty">No commands found</div>
                <Combobox.ItemGroup
                  v-for="[category, group] in collection.group()"
                  v-else
                  :key="category"
                  :class="styles.ItemGroup"
                >
                  <Combobox.ItemGroupLabel :class="styles.ItemGroupLabel">{{ category }}</Combobox.ItemGroupLabel>
                  <Combobox.Item v-for="item in group" :key="item.id" :class="styles.Item" :item="item" persist-focus>
                    <Combobox.ItemText :class="styles.ItemText">{{ item.label ?? item.id }}</Combobox.ItemText>
                    <kbd :class="styles.Shortcut">{{ formatHotkey(item.hotkey) }}</kbd>
                  </Combobox.Item>
                </Combobox.ItemGroup>
              </Combobox.Content>
            </Combobox.Root>
            <div :class="styles.Footer">
              <span :class="styles.FooterHint">
                <CornerDownLeftIcon :size="12" />
                to run
              </span>
              <span :class="styles.FooterHint">esc to close</span>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Teleport>
    </Dialog.Root>
  </div>
</template>
