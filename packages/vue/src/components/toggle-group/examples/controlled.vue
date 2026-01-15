<script setup lang="ts">
import { ToggleGroup } from '@ark-ui/vue/toggle-group'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/toggle-group.module.css'

const value = ref(['left'])
</script>

<template>
  <ToggleGroup.Root v-model:value="value" :class="styles.Root">
    <ToggleGroup.Item value="left" :class="styles.Item">
      <AlignLeftIcon />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="center" :class="styles.Item">
      <AlignCenterIcon />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="right" :class="styles.Item">
      <AlignRightIcon />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="justify" :class="styles.Item">
      <AlignJustifyIcon />
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
