<script setup lang="ts">
import { ToggleGroup, useToggleGroup } from '@ark-ui/vue/toggle-group'

const toggleGroup = useToggleGroup()
</script>

<template>
  <button @click="toggleGroup.setValue(['b'])">Set to B</button>

  <ToggleGroup.RootProvider :value="toggleGroup">
    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
  </ToggleGroup.RootProvider>
</template>
