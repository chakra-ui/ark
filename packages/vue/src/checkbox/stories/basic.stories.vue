<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'

const props = defineProps(['modelValue'])

const checkboxRef = ref(props.modelValue || true)
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
