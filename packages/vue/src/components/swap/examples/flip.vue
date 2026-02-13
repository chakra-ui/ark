<script setup lang="ts">
import { Swap } from '@ark-ui/vue/swap'
import { PauseIcon, PlayIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/swap.module.css'

const swapped = ref(false)
</script>

<template>
  <button type="button" :class="styles.Button" @click="swapped = !swapped">
    <Swap.Root :swap="swapped" :style="{ perspective: '200px' }">
      <Swap.Indicator type="on" :class="styles.FlipIndicator">
        <PlayIcon />
      </Swap.Indicator>
      <Swap.Indicator type="off" :class="styles.FlipIndicator">
        <PauseIcon />
      </Swap.Indicator>
    </Swap.Root>
  </button>
</template>
