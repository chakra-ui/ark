<script setup lang="ts">
import { Switch } from '@ark-ui/vue/switch'
import { ref } from 'vue'

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
