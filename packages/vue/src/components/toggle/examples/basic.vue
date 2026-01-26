<script setup lang="ts">
import { Toggle } from '@ark-ui/vue/toggle'
import { BoldIcon } from 'lucide-vue-next'
import styles from 'styles/toggle.module.css'
</script>

<template>
  <Toggle.Root :class="styles.Root">
    <BoldIcon />
  </Toggle.Root>
</template>
