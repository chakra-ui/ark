<script setup lang="ts">
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

const checkbox = useCheckbox()
</script>

<template>
  <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem">
    <button :class="button.Root" type="button" @click="() => checkbox.setChecked(true)">Check</button>
    <button :class="button.Root" type="button" @click="() => checkbox.setChecked(false)">Uncheck</button>
  </div>

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
