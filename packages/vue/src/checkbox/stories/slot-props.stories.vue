<script setup lang="ts">
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel, type CheckboxContext } from '..'
import '../checkbox.css'
</script>
<template>
  <Checkbox v-slot="{ isChecked }: CheckboxContext">
    <CheckboxLabel>Checkbox with slot props: {{ isChecked }}</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
</template>
