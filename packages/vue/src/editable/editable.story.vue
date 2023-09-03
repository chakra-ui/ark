<script setup lang="ts">
import { ref } from 'vue'
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
  EditableControl,
  EditableEditTrigger,
} from './'
const value = ref('Chakra')
</script>

<template>
  <Story title="Editable">
    <Variant title="Basic">
      <Editable placeholder="Placeholder" activationMode="dblclick">
        <EditableLabel>Label</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
      </Editable>
    </Variant>
    <Variant title="Controlled">
      <Editable
        activationMode="dblclick"
        placeholder="enter a value"
        v-model="value"
        v-slot="{ isEditing }"
      >
        <EditableLabel>Label</EditableLabel>
        <EditableArea>
          <EditableInput data-testid="edit-input" />
          <EditablePreview />
        </EditableArea>
        <EditableControl v-if="isEditing">
          <EditableSubmitTrigger>Save</EditableSubmitTrigger>
          <EditableCancelTrigger>Cancel</EditableCancelTrigger>
        </EditableControl>
        <EditableControl v-else>
          <EditableEditTrigger>Edit</EditableEditTrigger>
        </EditableControl>
      </Editable>
    </Variant>
  </Story>
</template>
