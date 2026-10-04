<script setup lang="ts">
import { createHotkeyStore, useHotkey } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import styles from 'styles/hotkeys.module.css'

const TIMEOUT_MS = 600
const completed = ref(0)

const store = createHotkeyStore({ sequenceTimeoutMs: TIMEOUT_MS })

useHotkey({
  hotkey: 'G > H',
  action: () => {
    completed.value += 1
  },
  store,
})
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">
      Press
      <kbd :class="styles.Kbd">G</kbd>
      then
      <kbd :class="styles.Kbd">H</kbd>
      . The second key must land within {{ TIMEOUT_MS }}ms, otherwise the sequence resets and nothing fires.
    </p>

    <div :class="styles.Metric">
      <span :class="styles.MetricValue">{{ completed }}</span>
      <span :class="styles.MetricLabel">{{ completed === 1 ? 'completion' : 'completions' }}</span>
    </div>

    <div :class="styles.Section">
      <span :class="styles.SectionLabel">sequenceTimeoutMs</span>
      <span :class="styles.Badge">{{ TIMEOUT_MS }}ms</span>
    </div>
  </div>
</template>
