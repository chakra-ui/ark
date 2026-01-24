<script setup lang="ts">
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

const checkbox = useCheckbox()
</script>

<template>
  <div class="vstack">
    <Checkbox.RootProvider :class="styles.Root" :value="checkbox">
      <Checkbox.Control :class="styles.Control">
        <Checkbox.Indicator :class="styles.Indicator">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label :class="styles.Label">Checkbox</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.RootProvider>

    <button v-if="checkbox.checked" :class="button.Root" type="button" @click="() => checkbox.setChecked(false)">
      Uncheck
    </button>
    <button v-else :class="button.Root" type="button" @click="() => checkbox.setChecked(true)">Check</button>
  </div>
</template>
