<script setup lang="ts">
import { ref, watch } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'

const checked = ref(true)

watch(checked, (newValue) => {
  console.log('checked:value', newValue)
})

setInterval(() => {
  checked.value = !checked.value
}, 2000)
</script>
<template>
  <Checkbox v-model="checked">
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
</template>
