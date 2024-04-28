<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type CheckboxCheckedState } from '../..'

const checked = ref<CheckboxCheckedState>(true)
</script>

<template>
  <Checkbox.Root v-model:checked="checked">
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
</template>
