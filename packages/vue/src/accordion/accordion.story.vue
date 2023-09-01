<script setup lang="ts">
import { Accordion } from './'

import { type Ref, ref } from 'vue'
const val: Ref<string[]> = ref(['panel-2'])
</script>

<template>
  <Story>
    <button @click="val = ['panel-2', 'panel-3']">Trigger</button>
    <Accordion.Root v-model="val" multiple>
      <Accordion.Item value="panel-1">
        <Accordion.Trigger as-child><button>AccordionPanel 1 trigger</button></Accordion.Trigger>
        <Accordion.Content>Much content to fit here 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="panel-2">
        <Accordion.Trigger>AccordionPanel 2 trigger</Accordion.Trigger>
        <Accordion.Content>Much content to fit here 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="panel-3">
        <Accordion.Trigger @click="() => console.log('iclickthetriggernospace')"
          >AccordionPanel 3 trigger</Accordion.Trigger
        >
        <Accordion.Content>Much content to fit here 3</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </Story>
</template>
