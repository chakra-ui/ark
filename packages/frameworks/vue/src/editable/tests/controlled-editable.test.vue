<script setup lang="ts">
import { Editable } from '../'
</script>

<template>
  <Editable.Root placeholder="Placeholder" v-slot="{ isEditing }">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Control v-if="isEditing">
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
    </Editable.Control>
    <Editable.Control v-else>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
