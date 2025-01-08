<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Switch } from '@ark-ui/vue/switch' /* PartiallyEnd: #3632/scriptSetup.vue */
import { Switch } from '@ark-ui/vue/switch'
</script>

<template>
  <Field.Root>
    <Switch.Root>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
