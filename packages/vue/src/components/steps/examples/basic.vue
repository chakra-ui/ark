<script setup lang="ts">
import { Steps } from '@ark-ui/vue/steps'
import button from 'styles/button.module.css'
import styles from 'styles/steps.module.css'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]
</script>

<template>
  <Steps.Root :class="styles.Root" :count="items.length">
    <Steps.List :class="styles.List">
      <Steps.Item v-for="(item, index) in items" :key="index" :class="styles.Item" :index="index">
        <Steps.Trigger :class="styles.Trigger">
          <Steps.Indicator :class="styles.Indicator">{{ index + 1 }}</Steps.Indicator>
          <span>{{ item.title }}</span>
        </Steps.Trigger>
        <Steps.Separator :class="styles.Separator" />
      </Steps.Item>
    </Steps.List>

    <Steps.Content v-for="(item, index) in items" :key="index" :class="styles.Content" :index="index">
      {{ item.title }} - {{ item.description }}
    </Steps.Content>

    <Steps.CompletedContent :class="styles.CompletedContent">
      Steps Complete - Thank you for filling out the form!
    </Steps.CompletedContent>

    <div :class="styles.Actions">
      <Steps.PrevTrigger :class="button.Root">Back</Steps.PrevTrigger>
      <Steps.NextTrigger :class="button.Root" data-variant="solid">Next</Steps.NextTrigger>
    </div>
  </Steps.Root>
</template>
