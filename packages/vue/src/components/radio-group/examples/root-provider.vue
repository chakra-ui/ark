<script setup lang="ts">
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import button from 'styles/button.module.css'
import styles from 'styles/radio-group.module.css'

const frameworks = ['React', 'Solid', 'Vue']
const radioGroup = useRadioGroup({ defaultValue: 'React' })
</script>

<template>
  <div class="stack">
    <RadioGroup.RootProvider :class="styles.Root" :value="radioGroup">
      <RadioGroup.Label :class="styles.Label">Framework</RadioGroup.Label>
      <RadioGroup.Item v-for="framework in frameworks" :key="framework" :class="styles.Item" :value="framework">
        <RadioGroup.ItemControl :class="styles.ItemControl" />
        <RadioGroup.ItemText :class="styles.ItemText">{{ framework }}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.RootProvider>

    <button :class="button.Root" @click="radioGroup.setValue('Solid')">Set to Solid</button>
  </div>
</template>
