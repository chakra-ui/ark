<script setup lang="ts">
import { useHotkeyRegistrations, useHotkeys } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import styles from 'styles/hotkeys.module.css'

const fired = ref<string[]>([])

useHotkeys([
  { id: 'first', hotkey: 'mod+K', action: () => fired.value.push('First'), label: 'First' },
  { id: 'second', hotkey: 'mod+K', action: () => fired.value.push('Second'), label: 'Second' },
])

const commands = useHotkeyRegistrations()
</script>

<template>
  <div :class="styles.Section">
    <span :class="styles.SectionLabel">Registered on mod+K</span>
    <div :class="styles.KeyStrip">
      <span v-if="commands.length === 0" :class="styles.Placeholder">none</span>
      <span v-for="command in commands" v-else :key="command.id" :class="styles.Badge">{{ command.label }}</span>
    </div>
  </div>

  <div :class="styles.Section">
    <span :class="styles.SectionLabel">Fired on last press</span>
    <span :class="styles.Badge" :data-state="fired.length > 0 ? 'active' : undefined">
      {{ fired.slice(-2).join(' + ') || 'nothing yet' }}
    </span>
  </div>
</template>
