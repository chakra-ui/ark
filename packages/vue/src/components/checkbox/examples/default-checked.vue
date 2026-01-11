<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'
</script>

<template>
  <Checkbox.Root :class="styles.Root" defaultChecked>
    <Checkbox.Control :class="styles.Control">
      <Checkbox.Indicator :class="styles.Indicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label :class="styles.Label">Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
