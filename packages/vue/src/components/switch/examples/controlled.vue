<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '../..'

const checked = ref(true)
</script>

<template>
  <Switch.Root v-model:checked="checked">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
