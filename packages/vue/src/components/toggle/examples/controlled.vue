<script setup lang="ts">
import { Toggle } from '@ark-ui/vue/toggle'
import { HeartIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/toggle.module.css'

const pressed = ref(false)
</script>

<template>
  <Toggle.Root :class="styles.Root" v-model:pressed="pressed">
    <Toggle.Indicator :class="styles.Indicator">
      <template #fallback>
        <HeartIcon />
      </template>
      <HeartIcon fill="currentColor" />
    </Toggle.Indicator>
  </Toggle.Root>
</template>
