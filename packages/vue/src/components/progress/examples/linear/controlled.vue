<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/progress.module.css'

const value = ref<number | null>(42)
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="value = 50">Set to 50</button>
    <Progress.Root :class="styles.Root" v-model="value">
      <Progress.Label :class="styles.Label">Label</Progress.Label>
      <Progress.ValueText :class="styles.ValueText" />
      <Progress.Track :class="styles.Track">
        <Progress.Range :class="styles.Range" />
      </Progress.Track>
    </Progress.Root>
  </div>
</template>
