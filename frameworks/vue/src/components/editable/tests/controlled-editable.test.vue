<script setup lang="ts">
import {
  EditableArea,
  EditableCancelTrigger,
  EditableContext,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRoot,
  EditableSubmitTrigger,
} from '..'
</script>

<template>
  <EditableRoot placeholder="Placeholder">
    <EditableContext v-slot="editable">
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControl v-if="editable.isEditing">
      <EditableSubmitTrigger>Save</EditableSubmitTrigger>
      <EditableCancelTrigger>Cancel</EditableCancelTrigger>
    </EditableControl>
    <EditableControl v-else>
      <EditableEditTrigger>Edit</EditableEditTrigger>
    </EditableControl>
    </EditableContext>
  </EditableRoot>
</template>
