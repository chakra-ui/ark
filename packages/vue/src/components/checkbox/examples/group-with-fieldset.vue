<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { Fieldset } from '@ark-ui/vue/fieldset'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'
import fieldset from 'styles/fieldset.module.css'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]
</script>

<template>
  <Fieldset.Root :class="fieldset.Root">
    <Fieldset.Legend :class="fieldset.Legend">Select frameworks</Fieldset.Legend>
    <Fieldset.HelperText :class="fieldset.HelperText">Choose your preferred frameworks</Fieldset.HelperText>
    <Checkbox.Group :class="styles.Group" :defaultValue="['react']" name="framework">
      <Checkbox.Root :class="styles.Root" v-for="item in items" :key="item.value" :value="item.value">
        <Checkbox.Control :class="styles.Control">
          <Checkbox.Indicator :class="styles.Indicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label :class="styles.Label">{{ item.label }}</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Checkbox.Group>
  </Fieldset.Root>
</template>
