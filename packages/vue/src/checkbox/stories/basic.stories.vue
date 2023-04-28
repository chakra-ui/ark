<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'

const checkboxRef = ref(true)
</script>
<template>
  <Story title="Checkbox - Basic">
    <Checkbox v-model="checkboxRef">
      <CheckboxLabel>Checkbox</CheckboxLabel>
      <CheckboxInput />
      <CheckboxControl>
        <span v-if="checkboxRef">✓</span>
      </CheckboxControl>
    </Checkbox>
  </Story>
</template>
