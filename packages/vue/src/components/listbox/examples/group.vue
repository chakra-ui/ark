<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/listbox.module.css'

const collection = createListCollection({
  items: [
    { label: 'New York', value: 'nyc', region: 'North America' },
    { label: 'Los Angeles', value: 'lax', region: 'North America' },
    { label: 'Toronto', value: 'yyz', region: 'North America' },
    { label: 'London', value: 'lhr', region: 'Europe' },
    { label: 'Paris', value: 'cdg', region: 'Europe' },
    { label: 'Berlin', value: 'ber', region: 'Europe' },
    { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
    { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
    { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
  ],
  groupBy: (item) => item.region,
})
</script>

<template>
  <Listbox.Root :class="styles.Root" :collection="collection">
    <Listbox.Label :class="styles.Label">Select Region</Listbox.Label>
    <Listbox.Content :class="styles.Content">
      <Listbox.ItemGroup v-for="[region, items] in collection.group()" :key="region" :class="styles.ItemGroup">
        <Listbox.ItemGroupLabel :class="styles.ItemGroupLabel">{{ region }}</Listbox.ItemGroupLabel>
        <Listbox.Item v-for="item in items" :key="item.value" :class="styles.Item" :item="item">
          <Listbox.ItemText :class="styles.ItemText">{{ item.label }}</Listbox.ItemText>
          <Listbox.ItemIndicator :class="styles.ItemIndicator">
            <CheckIcon />
          </Listbox.ItemIndicator>
        </Listbox.Item>
      </Listbox.ItemGroup>
    </Listbox.Content>
  </Listbox.Root>
</template>
