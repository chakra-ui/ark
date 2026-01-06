<script setup lang="ts">
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'

const checkbox = useCheckbox()
</script>

<template>
  <Checkbox.RootProvider :class="styles.Root" :value="checkbox">
    <Checkbox.Control :class="styles.Control">
      <Checkbox.Indicator :class="styles.Indicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label :class="styles.Label">Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.RootProvider>
</template>
