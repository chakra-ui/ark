<script setup lang="ts">
import { ref } from 'vue';
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
  <Editable activationMode="dblclick" placeholder="Placeholder" v-model="testProps" v-slot="{ isEditing }">
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput data-testid="edit-input" />
      <EditablePreview />
    </EditableArea>
    <EditableControl v-if="isEditing">
      <EditableSubmitTrigger>
        <button>Save</button>
      </EditableSubmitTrigger>
      <EditableCancelTrigger>
        <button>Cancel</button>
      </EditableCancelTrigger>
    </EditableControl>
    <EditableControl v-else>
      <EditableEditTrigger>
        <button>Edit</button>
      </EditableEditTrigger>
    </EditableControl>
  </Editable>
</template>
