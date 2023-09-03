<script setup lang="ts">
import { ref } from 'vue'
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from '../'

// For editable.test.tsx
const testProps = ref<string>('')
</script>
<template>
  <Editable
    activationMode="dblclick"
    placeholder="Placeholder"
    v-model="testProps"
    v-slot="{ isEditing }"
  >
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput data-testid="edit-input" />
      <EditablePreview />
    </EditableArea>
    <EditableControl v-if="isEditing">
      <EditableSubmitTrigger> Save </EditableSubmitTrigger>
      <EditableCancelTrigger> Cancel </EditableCancelTrigger>
    </EditableControl>
    <EditableControl v-else>
      <EditableEditTrigger> Edit </EditableEditTrigger>
    </EditableControl>
  </Editable>
</template>
