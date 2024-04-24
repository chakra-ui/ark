<script setup lang="ts">
import {
  EditableArea,
  EditableCancelTrigger,
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
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControl>
      <EditableSubmitTrigger>Save</EditableSubmitTrigger>
      <EditableCancelTrigger>Cancel</EditableCancelTrigger>
      <EditableEditTrigger>Edit</EditableEditTrigger>
    </EditableControl>
  </EditableRoot>
</template>
