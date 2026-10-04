<script setup lang="ts">
import { useHotkeyRecorder } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const binding = ref<string | null>(null)
const lastEvent = ref<string | null>(null)

const recorder = useHotkeyRecorder({
  onRecord: (hotkey) => {
    binding.value = hotkey.display
    lastEvent.value = 'recorded'
  },
  onCancel: () => {
    lastEvent.value = 'cancelled'
  },
  onClear: () => {
    binding.value = null
    lastEvent.value = 'cleared'
  },
})
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">
      Click record, then press a shortcut.
      <kbd :class="styles.Kbd">Esc</kbd>
      cancels,
      <kbd :class="styles.Kbd">Backspace</kbd>
      clears.
    </p>

    <div :class="styles.Toolbar">
      <button type="button" :class="button.Root" :disabled="recorder.state.value.recording" @click="recorder.start()">
        {{ recorder.state.value.recording ? 'Listening…' : 'Record shortcut' }}
      </button>
      <span v-if="recorder.state.value.recording" :class="styles.Badge" data-state="active">
        <span :class="styles.Dot" data-pulse="" />
        {{ recorder.state.value.value?.display ?? 'Press a key' }}
      </span>
    </div>

    <div :class="styles.Section">
      <span :class="styles.SectionLabel">Bound to</span>
      <div :class="styles.KeyStrip">
        <kbd v-if="binding" :class="styles.Kbd" data-active="">{{ binding }}</kbd>
        <span v-else :class="styles.Placeholder">nothing yet</span>
      </div>
    </div>

    <div :class="styles.Section">
      <span :class="styles.SectionLabel">Last event</span>
      <span :class="styles.Badge">{{ lastEvent ?? 'none' }}</span>
    </div>
  </div>
</template>
