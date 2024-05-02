<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type CheckboxCheckedState } from '../'

const checked = ref<CheckboxCheckedState>(false)
</script>

<template>
  <button @click="() => (checked = true)">set checked</button>
  <Checkbox.Root :checked="checked">
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control">
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
