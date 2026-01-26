<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import styles from 'styles/progress-circular.module.css'
</script>

<template>
  <Progress.Root :class="styles.Root" :defaultValue="42">
    <div :class="styles.CircleContainer">
      <Progress.Circle :class="styles.Circle">
        <Progress.CircleTrack :class="styles.CircleTrack" />
        <Progress.CircleRange :class="styles.CircleRange" />
      </Progress.Circle>
      <Progress.ValueText :class="styles.ValueText" />
    </div>
  </Progress.Root>
</template>
