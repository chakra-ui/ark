<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'
import { CheckIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/listbox.module.css'

const collection = createListCollection({
  items: [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
  ],
})

const value = ref(['md'])
</script>

<template>
  <Listbox.Root :class="styles.Root" :collection="collection" v-model="value">
    <Listbox.Label :class="styles.Label">Select Size</Listbox.Label>
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
