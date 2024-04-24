<script setup lang="ts">
import { Switch } from '../..'
</script>

<template>
  <Switch.Root :model-value="true">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
  </Switch.Root>
</template>
