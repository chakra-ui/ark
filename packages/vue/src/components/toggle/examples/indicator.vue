<script setup lang="ts">
import { Toggle } from '@ark-ui/vue/toggle'
import { HeartIcon } from 'lucide-vue-next'
import styles from 'styles/toggle.module.css'
</script>

<template>
  <Toggle.Root :class="styles.Root">
    <Toggle.Indicator :class="styles.Indicator">
      <template #fallback>
        <HeartIcon />
      </template>
      <HeartIcon fill="currentColor" />
    </Toggle.Indicator>
  </Toggle.Root>
</template>
