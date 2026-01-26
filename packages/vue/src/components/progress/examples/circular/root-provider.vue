<script setup lang="ts">
import { Progress, useProgress } from '@ark-ui/vue/progress'
import button from 'styles/button.module.css'
import styles from 'styles/progress-circular.module.css'

const progress = useProgress()
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="progress.setToMax()">Set to Max</button>
    <Progress.RootProvider :class="styles.Root" :value="progress">
      <div :class="styles.CircleContainer">
        <Progress.Circle :class="styles.Circle">
          <Progress.CircleTrack :class="styles.CircleTrack" />
          <Progress.CircleRange :class="styles.CircleRange" />
        </Progress.Circle>
        <Progress.ValueText :class="styles.ValueText" />
      </div>
    </Progress.RootProvider>
  </div>
</template>
