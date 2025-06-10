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
    <Editable.Context v-slot="{ editing }">
      <Editable.Control v-if="editing">
        <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
        <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      </Editable.Control>
      <Editable.Control v-else>
        <Editable.EditTrigger>Edit</Editable.EditTrigger>
      </Editable.Control>
    </Editable.Context>
  </Editable.Root>
</template>
