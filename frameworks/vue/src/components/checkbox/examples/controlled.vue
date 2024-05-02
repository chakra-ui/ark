<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type CheckboxCheckedState } from '../..'
import { CheckIcon } from './icons'

const checked = ref<CheckboxCheckedState>(true)
</script>

<template>
  <Checkbox.Root v-model:checked="checked">
    <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
