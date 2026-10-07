<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const locales = [
  { locale: 'en-US', label: 'English' },
  { locale: 'de-DE', label: 'Deutsch' },
  { locale: 'ar-EG', label: 'العربية' },
  { locale: 'hi-IN-u-nu-deva', label: 'हिन्दी' },
]

const value = ref(1_234_567.89)
</script>

<template>
  <div class="stack">
    <div :class="styles.Grid">
      <div v-for="item in locales" :key="item.locale" :class="styles.Stat">
        <span :class="styles.Label">{{ item.label }}</span>
        <NumberFlow.Root v-model="value" :locale="item.locale" :class="styles.Root">
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
    </div>
    <button type="button" :class="button.Root" @click="value = Math.round(Math.random() * 10_000_000) / 100">
      Randomize
    </button>
  </div>
</template>
