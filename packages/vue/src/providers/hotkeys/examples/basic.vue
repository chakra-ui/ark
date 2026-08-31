<script setup lang="ts">
import { useFormatHotkey, useHotkey } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import styles from 'styles/hotkeys.module.css'

const count = ref(0)
const formatHotkey = useFormatHotkey()

useHotkey({
  hotkey: 'mod+K',
  action: () => {
    count.value += 1
  },
})
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">
      Press
      <kbd :class="styles.Kbd">{{ formatHotkey('mod+K') }}</kbd>
      anywhere on this page
    </p>
    <div :class="styles.Metric">
      <span :class="styles.MetricValue">{{ count }}</span>
      <span :class="styles.MetricLabel">{{ count === 1 ? 'time' : 'times' }}</span>
    </div>
  </div>
</template>
