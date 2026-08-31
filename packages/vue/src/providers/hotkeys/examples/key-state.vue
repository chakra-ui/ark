<script setup lang="ts">
import { useHotkey, useIsKeyPressed, usePressedKeys } from '@ark-ui/vue/hotkeys'
import styles from 'styles/hotkeys.module.css'

useHotkey({ hotkey: 'mod+K', action: () => {} })

const pressedKeys = usePressedKeys()
const isShiftPressed = useIsKeyPressed({ hotkey: 'shift' })
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">Hold any key to see it tracked live</p>

    <div :class="styles.Section">
      <span :class="styles.SectionLabel">Currently pressed</span>
      <div :class="styles.KeyStrip">
        <span v-if="pressedKeys.length === 0" :class="styles.Placeholder">nothing</span>
        <kbd v-for="key in pressedKeys" v-else :key="key" :class="styles.Kbd" data-active="">{{ key }}</kbd>
      </div>
    </div>

    <div :class="styles.Section">
      <span :class="styles.SectionLabel">Shift</span>
      <span :class="styles.Badge" :data-state="isShiftPressed ? 'active' : undefined">
        <span :class="styles.Dot" :data-pulse="isShiftPressed ? '' : undefined" />
        {{ isShiftPressed ? 'Precision mode' : 'Hold Shift for precision' }}
      </span>
    </div>
  </div>
</template>
