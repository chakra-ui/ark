<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from '../'

const testProps = ref<string[]>([])
</script>

<template>
  <ToggleGroup.Root v-model="testProps">
    <ToggleGroup.Toggle value="a">A</ToggleGroup.Toggle>
    <ToggleGroup.Toggle value="b">B</ToggleGroup.Toggle>
    <ToggleGroup.Toggle value="c">C</ToggleGroup.Toggle>
  </ToggleGroup.Root>
</template>
