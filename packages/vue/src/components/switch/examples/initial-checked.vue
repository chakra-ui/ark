<script setup lang="ts">
import { Switch } from '@ark-ui/vue/switch'
import styles from 'styles/switch.module.css'
</script>

<template>
  <Switch.Root :class="styles.Root" defaultChecked>
    <Switch.Control :class="styles.Control">
      <Switch.Thumb :class="styles.Thumb" />
    </Switch.Control>
    <Switch.Label :class="styles.Label">Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
