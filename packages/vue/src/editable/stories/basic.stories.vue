<script setup lang="ts">
import { Editable, EditableArea, EditableInput, EditableLabel, EditablePreview } from '../'
</script>
<template>
  <Editable id="my" placeholder="Placeholder" activationMode="dblclick">
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
  </Editable>
</template>
