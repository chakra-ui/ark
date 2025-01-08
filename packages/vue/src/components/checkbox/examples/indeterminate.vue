<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-vue-next' /* PartiallyEnd: #3632/scriptSetup.vue */
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
</script>

<template>
  <Checkbox.Root checked="indeterminate">
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
