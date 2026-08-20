<script setup lang="ts">
import { useFormatHotkey, useHotkeyStore, useHotkeys } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: '05-bold', hotkey: 'mod+B', label: 'Bold', scope: 'editor' },
  { id: '05-print', hotkey: 'mod+P', label: 'Print', scope: 'reader' },
]

const store = useHotkeyStore()
const formatHotkey = useFormatHotkey()
const scope = ref('editor')
const fired = ref<string | null>(null)

useHotkeys(
  commands.map((command) => ({
    id: command.id,
    hotkey: command.hotkey,
    scopes: [command.scope],
    action: () => {
      fired.value = command.id
    },
  })),
)

const toggle = () => {
  scope.value = scope.value === 'editor' ? 'reader' : 'editor'
  fired.value = null
  store.setScope(scope.value)
}
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">Only commands in the active scope respond</p>

    <div :class="styles.Toolbar">
      <button type="button" :class="button.Root" @click="toggle">Switch scope</button>
      <span :class="styles.Badge" data-state="active">{{ scope }}</span>
    </div>

    <ul :class="styles.List">
      <li
        v-for="command in commands"
        :key="command.id"
        :class="styles.Row"
        :data-fired="command.id === fired ? '' : undefined"
      >
        <span :style="{ opacity: command.scope === scope ? 1 : 0.45 }">
          {{ command.label }}
          <span :class="styles.MetricLabel">· {{ command.scope }}</span>
        </span>
        <kbd :class="styles.Kbd" :data-active="command.id === fired ? '' : undefined">
          {{ formatHotkey(command.hotkey) }}
        </kbd>
      </li>
    </ul>
  </div>
</template>
