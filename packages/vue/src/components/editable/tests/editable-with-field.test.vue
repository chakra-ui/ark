<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import { Field } from '@ark-ui/vue/field'
import type { RootProps } from '../../field/field.types.ts'

defineProps<RootProps>()
</script>

<template>
  <Field.Root :disabled="disabled" :invalid="invalid" :readOnly="readOnly" :required="required">
    <Editable.Root placeholder="Placeholder" activationMode="dblclick">
      <Editable.Label>Label</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
    </Editable.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
