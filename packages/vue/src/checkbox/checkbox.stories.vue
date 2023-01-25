<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '.'
import './checkbox.css'

const checkboxRef = ref(false)
</script>
<template>
  <Checkbox v-model="checkboxRef">
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl>
      <span v-if="checkboxRef">✓</span>
    </CheckboxControl>
  </Checkbox>
</template>
