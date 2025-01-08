<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import { Field } from '@ark-ui/vue/field' /* PartiallyEnd: #3632/scriptSetup.vue */
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <Field.Root>
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
