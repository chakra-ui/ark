<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '../..'

const checked = ref(false)
</script>

<template>
  <Switch.Root #default="api">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Feature is {{ api.isChecked ? 'enabled' : 'disabled' }}</Switch.Label>
  </Switch.Root>
</template>
