<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '../..'

const checked = ref(false)
</script>

<template>
  <Switch.Root disabled>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
  </Switch.Root>
</template>
