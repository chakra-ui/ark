<script setup lang="ts">
import { Switch, useSwitch } from '@ark-ui/vue/switch'

const switchApi = useSwitch()
</script>

<template>
  <button @click="switchApi.toggleChecked()">Toggle</button>

  <Switch.RootProvider :value="switchApi">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.RootProvider>
</template>
