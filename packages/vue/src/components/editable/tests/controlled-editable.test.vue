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
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableContext v-slot="{ editing }">
      <EditableControl v-if="editing">
        <EditableSubmitTrigger>Save</EditableSubmitTrigger>
        <EditableCancelTrigger>Cancel</EditableCancelTrigger>
      </EditableControl>
      <EditableControl v-else>
        <EditableEditTrigger>Edit</EditableEditTrigger>
      </EditableControl>
    </EditableContext>
  </EditableRoot>
</template>
