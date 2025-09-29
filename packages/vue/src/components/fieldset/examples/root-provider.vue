<script setup lang="ts">
import { Fieldset, useFieldset } from '@ark-ui/vue/fieldset'

const fieldset = useFieldset()
</script>

<template>
  <Fieldset.RootProvider :value="fieldset">
    <Fieldset.Legend>Contact Information</Fieldset.Legend>
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" required />
    </div>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" required />
    </div>
    <Fieldset.HelperText>Please fill out all required fields</Fieldset.HelperText>
  </Fieldset.RootProvider>
</template>
