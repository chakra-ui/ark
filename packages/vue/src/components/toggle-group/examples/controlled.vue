<script setup lang="ts">
import { ToggleGroup } from '@ark-ui/vue/toggle-group'
import { ref } from 'vue'

const value = ref<string[]>(['a'])
</script>

<template>
  <p>Value: {{ value }}</p>
  <ToggleGroup.Root v-model="value">
    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
