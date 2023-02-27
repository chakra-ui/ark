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
  UseEditableReturn,
} from '../'

const editableRef = ref<{ api: UseEditableReturn }>()

// For editable.test.tsx
const testProps = defineProps(['modelValue'])
</script>
<template>
  <Editable
    ref="editableRef"
    activationMode="dblclick"
    placeholder="Placeholder"
    v-bind="testProps"
  >
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput data-testid="edit-input" />
      <EditablePreview />
    </EditableArea>
    <EditableControl v-if="editableRef?.api.isEditing">
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
