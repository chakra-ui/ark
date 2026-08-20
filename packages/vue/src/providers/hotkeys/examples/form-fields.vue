<script setup lang="ts">
import { useFormatHotkey, useHotkeys } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import styles from 'styles/hotkeys.module.css'

const log = ref<string | null>(null)
const formatHotkey = useFormatHotkey()

useHotkeys([
  { id: 'search', hotkey: 'S', action: () => (log.value = 'Search (single key)') },
  { id: 'save', hotkey: 'mod+S', action: () => (log.value = 'Save (modifier)') },
  {
    id: 'preview',
    hotkey: 'P',
    action: () => (log.value = 'Preview (opted in)'),
    options: { enableOnFormTags: true },
  },
])
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">Try each shortcut outside the field, then again with the field focused</p>

    <input :class="styles.Input" placeholder="Type here…" aria-label="Note" />

    <ul :class="styles.List">
      <li :class="styles.Row">
        <span>
          Search
          <span :class="styles.MetricLabel">· ignored while typing</span>
        </span>
        <kbd :class="styles.Kbd">{{ formatHotkey('S') }}</kbd>
      </li>
      <li :class="styles.Row">
        <span>
          Save
          <span :class="styles.MetricLabel">· modifiers always fire</span>
        </span>
        <kbd :class="styles.Kbd">{{ formatHotkey('mod+S') }}</kbd>
      </li>
      <li :class="styles.Row">
        <span>
          Preview
          <span :class="styles.MetricLabel">· enableOnFormTags</span>
        </span>
        <kbd :class="styles.Kbd">{{ formatHotkey('P') }}</kbd>
      </li>
    </ul>

    <div :class="styles.Section">
      <span :class="styles.SectionLabel">Last fired</span>
      <span :class="styles.Badge" :data-state="log ? 'active' : undefined">{{ log ?? 'nothing yet' }}</span>
    </div>
  </div>
</template>
