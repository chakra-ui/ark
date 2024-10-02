<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import { ref } from 'vue'
const value = ref('Chakra')
</script>

<template>
  <Editable.Root placeholder="enter a value" v-model="value">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Context v-slot="{ editing }">
      <Editable.Control v-if="editing">
        <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
        <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      </Editable.Control>
      <Editable.Control v-else>
        <Editable.EditTrigger>Edit</Editable.EditTrigger>
      </Editable.Control>
    </Editable.Context>
  </Editable.Root>
</template>
