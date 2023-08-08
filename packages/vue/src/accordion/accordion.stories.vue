<script setup lang="ts">
import { Accordion } from './'

import { type Ref, ref } from 'vue'
const val: Ref<string | string[]> = ref('panel-2')
</script>

<template>
  <button @click="val = 'panel-3'">Trigger</button>
  <Accordion.Root v-model="val">
    <Accordion.Item value="panel-1" disabled>
      <Accordion.Trigger>
        <button>Panel 1 trigger</button>
      </Accordion.Trigger>
      <Accordion.Content>Much content to fit here 1</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="panel-2">
      <Accordion.Trigger>
        <button>Panel 2 trigger</button>
      </Accordion.Trigger>
      <Accordion.Content>Much content to fit here 2</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="panel-3">
      <Accordion.Trigger>
        <button>Panel 3 trigger</button>
      </Accordion.Trigger>
      <Accordion.Content>Much content to fit here 3</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</template>
