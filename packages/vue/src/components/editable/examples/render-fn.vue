<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
</script>

<template>
  <Editable.Root placeholder="-">
    <Editable.Context v-slot="editable">
      <Editable.Label>Value is {{ editable.valueText }}</Editable.Label>
    </Editable.Context>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>

    <Editable.Control>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
