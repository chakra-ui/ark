<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'

const checked = ref(true)
</script>
<template>
  <Checkbox v-model="checked">
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
</template>
