<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { Fieldset } from '@ark-ui/vue/fieldset'
import { CheckIcon } from 'lucide-vue-next'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]
</script>

<template>
  <Fieldset.Root>
    <Fieldset.Legend>Select frameworks</Fieldset.Legend>
    <Checkbox.Group :defaultValue="['react']" name="framework">
      <Checkbox.Root v-for="item in items" :key="item.value" :value="item.value">
        <Checkbox.Label>{{ item.label }}</Checkbox.Label>
        <Checkbox.Control>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Checkbox.Group>
    <Fieldset.HelperText>Choose your preferred frameworks</Fieldset.HelperText>
    <Fieldset.ErrorText>Error Text</Fieldset.ErrorText>
  </Fieldset.Root>
</template>
