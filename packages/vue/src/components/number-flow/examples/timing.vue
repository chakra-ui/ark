<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const value = ref(31_415)
</script>

<template>
  <div :class="styles.Card">
    <span :class="styles.Label">Downloads</span>
    <NumberFlow.Root
      v-model="value"
      stagger="60ms"
      :spin-timing="{ duration: '1400ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }"
      :transform-timing="{ duration: '700ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }"
      :class="[styles.Root, styles.Display]"
    >
      <NumberFlow.Segments />
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
    <span :class="styles.Caption">A slower spring with each digit trailing the one before it.</span>
    <button type="button" :class="button.Root" @click="value = Math.round(Math.random() * 999_999)">Randomize</button>
  </div>
</template>
