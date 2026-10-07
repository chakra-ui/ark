<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const value = ref(120)
</script>

<template>
  <div :class="styles.Card">
    <span :class="styles.Label">Points</span>
    <NumberFlow.Root v-model="value" :continuous="true" :class="[styles.Root, styles.Display]">
      <NumberFlow.Segments />
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
    <span :class="styles.Caption">Every digit spins through the values in between.</span>
    <div :class="styles.Actions">
      <button type="button" :class="button.Root" @click="value += 12">+12</button>
      <button type="button" :class="button.Root" @click="value += 125">+125</button>
      <button type="button" :class="button.Root" @click="value = 120">Reset</button>
    </div>
  </div>
</template>
