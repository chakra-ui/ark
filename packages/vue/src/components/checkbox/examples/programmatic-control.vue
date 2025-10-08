<script setup lang="ts">
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'

const checkbox = useCheckbox()
</script>

<template>
  <button type="button" @click="() => checkbox.setChecked(true)">Check</button>
  <button type="button" @click="() => checkbox.setChecked(false)">Uncheck</button>

  <Checkbox.RootProvider :value="checkbox">
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.RootProvider>
</template>
