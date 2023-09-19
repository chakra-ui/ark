<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from '../'

const testProps = ref<string[]>([])
</script>

<template>
  <ToggleGroup.Root v-model="testProps">
    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
