<script setup lang="ts">
import { ToggleGroup, useToggleGroup } from '@ark-ui/vue/toggle-group'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-vue-next'
import styles from 'styles/toggle-group.module.css'

const toggleGroup = useToggleGroup({ defaultValue: ['left'] })
</script>

<template>
  <output>Selected: {{ String(toggleGroup.value) }}</output>
  <ToggleGroup.RootProvider :value="toggleGroup" :class="styles.Root">
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
  </ToggleGroup.RootProvider>
</template>
