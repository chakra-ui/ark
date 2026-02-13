<script setup lang="ts">
import { Swap } from '@ark-ui/vue/swap'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/swap.module.css'

const swapped = ref(false)
</script>

<template>
  <button type="button" :class="styles.Button" @click="swapped = !swapped">
    <Swap.Root :swap="swapped">
      <Swap.Indicator type="on" :class="styles.FadeIndicator">
        <CheckIcon />
      </Swap.Indicator>
      <Swap.Indicator type="off" :class="styles.FadeIndicator">
        <XIcon />
      </Swap.Indicator>
    </Swap.Root>
  </button>
</template>
