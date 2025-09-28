<script setup lang="ts">
import { Steps } from '@ark-ui/vue/steps'
import { ref } from 'vue'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

const currentStep = ref(0)
</script>

<template>
  <div>
    <div>
      <strong>Current Step:</strong>
      {{ currentStep }}
      <button @click="currentStep = 0">Reset to First</button>
      <button @click="currentStep = items.length - 1">Skip to Last</button>
    </div>

    <Steps.Root v-model:step="currentStep" :count="items.length">
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
    </Steps.Root>
  </div>
</template>
