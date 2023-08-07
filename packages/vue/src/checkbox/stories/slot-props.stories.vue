<script setup lang="ts">
import { Checkbox, CheckboxControl, CheckboxLabel } from '..'
import '../checkbox.css'
</script>

<template>
  <Checkbox #default="{ isChecked }">
    <CheckboxLabel>Checkbox with slot props: {{ isChecked }}</CheckboxLabel>
    <CheckboxControl />
  </Checkbox>
</template>
