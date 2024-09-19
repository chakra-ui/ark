<script setup lang="ts">
import { Editable } from '..'
</script>

<template>
  <Editable.Root placeholder="Placeholder">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Control>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
