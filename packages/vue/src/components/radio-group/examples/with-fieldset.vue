<script setup lang="ts">
import { Fieldset } from '@ark-ui/vue/fieldset'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import fieldset from 'styles/fieldset.module.css'
import styles from 'styles/radio-group.module.css'

const frameworks = ['React', 'Solid', 'Vue']
</script>

<template>
  <Fieldset.Root :class="fieldset.Root">
    <Fieldset.Legend :class="fieldset.Legend">Select a framework</Fieldset.Legend>
    <RadioGroup.Root :class="styles.Root">
      <RadioGroup.Item v-for="framework in frameworks" :key="framework" :class="styles.Item" :value="framework">
        <RadioGroup.ItemControl :class="styles.ItemControl" />
        <RadioGroup.ItemText :class="styles.ItemText">{{ framework }}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Root>
    <Fieldset.HelperText :class="fieldset.HelperText">Choose your preferred framework</Fieldset.HelperText>
    <Fieldset.ErrorText :class="fieldset.ErrorText">Please select a framework</Fieldset.ErrorText>
  </Fieldset.Root>
</template>
