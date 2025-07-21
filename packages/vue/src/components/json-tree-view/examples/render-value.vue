<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'

const isEmail = (value: string) => {
  const strippedValue = value.replace(/^"(.*)"$/, '$1')
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strippedValue)
}
</script>

<template>
  <JsonTreeView.Root
    :default-expanded-depth="2"
    :data="{
      name: 'John Doe',
      age: 30,
      number: Number.NaN,
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
    }"
  >
    <JsonTreeView.Tree>
      <template #arrow>
        <ChevronRightIcon />
      </template>
      <template #renderValue="{ node }">
        <a
          v-if="node.type === 'text' && typeof node.value === 'string' && isEmail(node.value)"
          :href="`mailto:${node.value}`"
          target="_blank"
          rel="noreferrer"
        >
          {{ node.value }}
        </a>
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
