<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from '../..'

const value = ref(['b'])
</script>

<template>
  <ToggleGroup.Root>
    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
