<script setup lang="ts">
import { Fieldset } from '@ark-ui/vue/fieldset'
</script>

<template>
  <Fieldset.Root invalid>
    <Fieldset.Legend>Invalid Fieldset</Fieldset.Legend>
    <input type="email" value="invalid-email" />
    <Fieldset.ErrorText>Please provide a valid email address</Fieldset.ErrorText>
  </Fieldset.Root>
</template>
