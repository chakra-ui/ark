<script setup lang="ts">
import { ref } from 'vue'
import { Editable } from '../'
const value = ref('Chakra')
</script>

<template>
  <Story title="Editable">
    <Variant title="Basic">
      <Editable.Root placeholder="Placeholder" activationMode="dblclick">
        <Editable.Label>Label</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
      </Editable.Root>
    </Variant>

    <Variant title="CustomControls">
      <Editable.Root placeholder="enter a value" v-model="value" v-slot="{ isEditing }">
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
    </Variant>
  </Story>
</template>
