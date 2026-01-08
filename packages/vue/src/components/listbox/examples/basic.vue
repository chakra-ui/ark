<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/listbox.module.css'

const collection = createListCollection({
  items: [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
  ],
})
</script>

<template>
  <Listbox.Root :class="styles.Root" :collection="collection">
    <Listbox.Label :class="styles.Label">Select Country</Listbox.Label>
    <Listbox.Content :class="styles.Content">
      <Listbox.Item v-for="item in collection.items" :key="item.value" :class="styles.Item" :item="item">
        <Listbox.ItemText :class="styles.ItemText">{{ item.label }}</Listbox.ItemText>
        <Listbox.ItemIndicator :class="styles.ItemIndicator">
          <CheckIcon />
        </Listbox.ItemIndicator>
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>
