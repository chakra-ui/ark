<script setup lang="ts">
import { Swap } from '@ark-ui/vue/swap'
import { Volume2Icon, VolumeXIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/swap.module.css'

const swapped = ref(false)
</script>

<template>
  <button type="button" :class="styles.Button" @click="swapped = !swapped">
    <Swap.Root :swap="swapped">
      <Swap.Indicator type="on" :class="styles.ScaleIndicator">
        <Volume2Icon />
      </Swap.Indicator>
      <Swap.Indicator type="off" :class="styles.ScaleIndicator">
        <VolumeXIcon />
      </Swap.Indicator>
    </Swap.Root>
  </button>
</template>
