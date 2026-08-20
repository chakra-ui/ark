<script setup lang="ts">
import { type ConflictBehavior, HotkeysProvider } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'
import ConflictDemo from './conflict-demo.vue'

const BEHAVIORS: ConflictBehavior[] = ['warn', 'replace', 'allow']
const behavior = ref<ConflictBehavior>('warn')
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">Two commands claim the same shortcut. Pick how the store resolves it, then press it.</p>

    <div :class="styles.Toolbar">
      <button v-for="value in BEHAVIORS" :key="value" type="button" :class="button.Root" @click="behavior = value">
        {{ value }}
      </button>
    </div>

    <HotkeysProvider :key="behavior" :conflict-behavior="behavior">
      <ConflictDemo />
    </HotkeysProvider>
  </div>
</template>
