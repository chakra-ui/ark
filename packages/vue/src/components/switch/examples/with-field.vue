<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Switch } from '@ark-ui/vue/switch'
import field from 'styles/field.module.css'
import styles from 'styles/switch.module.css'
</script>

<template>
  <Field.Root :class="field.Root">
    <Switch.Root :class="styles.Root">
      <Switch.Control :class="styles.Control">
        <Switch.Thumb :class="styles.Thumb" />
      </Switch.Control>
      <Switch.Label :class="styles.Label">Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <Field.HelperText :class="field.HelperText">Additional Info</Field.HelperText>
    <Field.ErrorText :class="field.ErrorText">Error Info</Field.ErrorText>
  </Field.Root>
</template>
