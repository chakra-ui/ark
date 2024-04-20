<script setup lang="ts">
import { Switch } from '../..'
</script>

<template>
  <Switch.Root #default="api">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Feature is {{ api.isChecked ? 'enabled' : 'disabled' }}</Switch.Label>
  </Switch.Root>
</template>
