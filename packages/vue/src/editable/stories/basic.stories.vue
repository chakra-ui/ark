<script setup lang="ts">
import { Editable, EditableArea, EditableInput, EditableLabel, EditablePreview } from '../'
</script>
<template>
  <Story title="Editable - Basic">
    <Editable placeholder="Placeholder" activationMode="dblclick">
      <EditableLabel>Label</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
    </Editable>
  </Story>
</template>
