<script setup lang="ts">
import { Steps, useSteps } from '@ark-ui/vue/steps'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

const steps = useSteps({ count: items.length })
const resetStep = () => steps.value.resetStep()
</script>

<template>
  <button @click="resetStep">Reset</button>

  <Steps.RootProvider :value="steps">
    <Steps.List>
      <Steps.Item v-for="(item, index) in items" :key="index" :index="index">
        <Steps.Trigger>
          <Steps.Indicator>{{ index + 1 }}</Steps.Indicator>
          <span>{{ item.title }}</span>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    </Steps.List>

    <Steps.Content v-for="(item, index) in items" :key="index" :index="index">
      {{ item.title }} - {{ item.description }}
    </Steps.Content>

    <Steps.CompletedContent>Steps Complete - Thank you for filling out the form!</Steps.CompletedContent>

    <div>
      <Steps.PrevTrigger>Back</Steps.PrevTrigger>
      <Steps.NextTrigger>Next</Steps.NextTrigger>
    </div>
  </Steps.RootProvider>
</template>
