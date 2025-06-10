<script setup lang="ts">
import { Editable, type EditableRootEmits, type EditableRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<EditableRootProps>()
const emits = defineEmits<EditableRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Editable.Root placeholder="Placeholder" v-bind="localProps">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Control>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
