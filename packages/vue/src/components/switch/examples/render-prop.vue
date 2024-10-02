<script setup lang="ts">
import { Switch } from '@ark-ui/vue/switch'
</script>

<template>
  <Switch.Root>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Context v-slot="api">
      <Switch.Label>Feature is {{ api.checked ? 'enabled' : 'disabled' }}</Switch.Label>
    </Switch.Context>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
