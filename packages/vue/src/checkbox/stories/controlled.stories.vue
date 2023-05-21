<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'
import CheckIcon from './CheckIcon.vue'

const checked = ref(true)
</script>
<template>
  <Checkbox v-model="checked">
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl>
      <CheckIcon v-show="checked" />
    </CheckboxControl>
  </Checkbox>
</template>
