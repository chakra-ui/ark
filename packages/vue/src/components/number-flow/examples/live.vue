<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const value = ref(3)
</script>

<template>
  <div :class="styles.Card">
    <span :class="styles.Label">Items in cart</span>
    <NumberFlow.Root v-model="value" :live="true" :class="[styles.Root, styles.Display]">
      <NumberFlow.Segments />
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
    <span :class="styles.Caption">Screen readers announce the count once it settles.</span>
    <div :class="styles.Actions">
      <button type="button" :class="button.Root" @click="value = Math.max(0, value - 1)">Remove item</button>
      <button type="button" :class="button.Root" data-variant="solid" @click="value++">Add item</button>
    </div>
  </div>
</template>
