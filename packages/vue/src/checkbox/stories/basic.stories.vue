<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'
import CheckIcon from './CheckIcon.vue'

const checkboxRef = ref(true)
</script>
<template>
  <Checkbox v-model="checkboxRef">
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl>
      <CheckIcon v-if="checkboxRef">✓</CheckIcon>
    </CheckboxControl>
  </Checkbox>
</template>
