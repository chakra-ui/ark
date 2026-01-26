<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/progress-circular.module.css'

const value = ref<number | null>(42)
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="value = 100">Set to 100</button>
    <Progress.Root :class="styles.Root" v-model="value">
      <div :class="styles.CircleContainer">
        <Progress.Circle :class="styles.Circle">
          <Progress.CircleTrack :class="styles.CircleTrack" />
          <Progress.CircleRange :class="styles.CircleRange" />
        </Progress.Circle>
        <Progress.ValueText :class="styles.ValueText" />
      </div>
    </Progress.Root>
  </div>
</template>
