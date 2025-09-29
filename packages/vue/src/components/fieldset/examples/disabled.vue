<script setup lang="ts">
import { Fieldset } from '@ark-ui/vue/fieldset'
</script>

<template>
  <Fieldset.Root disabled>
    <Fieldset.Legend>Disabled Fieldset</Fieldset.Legend>
    <input type="text" placeholder="This input is disabled" />
    <Fieldset.HelperText>This fieldset is disabled</Fieldset.HelperText>
  </Fieldset.Root>
</template>
