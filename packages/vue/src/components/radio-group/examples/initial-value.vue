<script setup lang="ts">
import { RadioGroup } from '@ark-ui/vue/radio-group'
import styles from 'styles/radio-group.module.css'

const frameworks = ['React', 'Solid', 'Vue']
</script>

<template>
  <RadioGroup.Root :class="styles.Root" defaultValue="Solid">
    <RadioGroup.Label :class="styles.Label">Framework</RadioGroup.Label>
    <RadioGroup.Item v-for="framework in frameworks" :key="framework" :class="styles.Item" :value="framework">
      <RadioGroup.ItemControl :class="styles.ItemControl" />
      <RadioGroup.ItemText :class="styles.ItemText">{{ framework }}</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
