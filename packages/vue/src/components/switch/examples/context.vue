<script setup lang="ts">
import { Switch } from '@ark-ui/vue/switch'
import styles from 'styles/switch.module.css'
</script>

<template>
  <Switch.Root :class="styles.Root">
    <Switch.Control :class="styles.Control">
      <Switch.Thumb :class="styles.Thumb" />
    </Switch.Control>
    <Switch.Context v-slot="api">
      <Switch.Label :class="styles.Label">Feature is {{ api.checked ? 'enabled' : 'disabled' }}</Switch.Label>
    </Switch.Context>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
