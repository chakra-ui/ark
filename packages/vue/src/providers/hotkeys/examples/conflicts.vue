<script setup lang="ts">
import { type ConflictBehavior, createHotkeyStore } from '@ark-ui/vue/hotkeys'
import { computed, ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'
import ConflictDemo from './conflict-demo.vue'

const BEHAVIORS: ConflictBehavior[] = ['warn', 'replace', 'allow']
const behavior = ref<ConflictBehavior>('warn')

// Conflict behavior is fixed when the store is created, so switching it makes a new store.
const store = computed(() => createHotkeyStore({ conflictBehavior: behavior.value }))
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">Two commands claim the same shortcut. Pick how the store resolves it, then press it.</p>

    <div :class="styles.Toolbar">
      <button v-for="value in BEHAVIORS" :key="value" type="button" :class="button.Root" @click="behavior = value">
        {{ value }}
      </button>
    </div>

    <ConflictDemo :key="behavior" :store="store" />
  </div>
</template>
