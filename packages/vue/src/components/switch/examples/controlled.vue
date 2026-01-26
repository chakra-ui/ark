<script setup lang="ts">
import { Switch } from '@ark-ui/vue/switch'
import { ref } from 'vue'
import styles from 'styles/switch.module.css'

const checked = ref(false)
</script>

<template>
  <Switch.Root :class="styles.Root" v-model:checked="checked">
    <Switch.Control :class="styles.Control">
      <Switch.Thumb :class="styles.Thumb" />
    </Switch.Control>
    <Switch.Label :class="styles.Label">Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
