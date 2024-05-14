<script setup lang="ts">
import { Switch } from '../..'
</script>

<template>
  <Switch.Root :defaultChecked="true">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
