<script setup lang="ts">
import { ref, watch } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'
</script>
<template>
  <Checkbox #default="{ isChecked }">
    <CheckboxLabel>Checkbox with slot props: {{ isChecked }}</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
</template>
