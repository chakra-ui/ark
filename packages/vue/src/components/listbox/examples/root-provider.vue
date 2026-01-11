<script setup lang="ts">
import { Listbox, createListCollection, useListbox } from '@ark-ui/vue/listbox'
import { CheckIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/listbox.module.css'

const collection = createListCollection({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ],
})

const listboxValue = useListbox({ collection })
const listbox = computed(() => listboxValue.value)
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="listbox.setValue(['high'])">Set to High</button>
    <Listbox.RootProvider :class="styles.Root" :value="listbox">
      <Listbox.Label :class="styles.Label">Select Priority</Listbox.Label>
      <Listbox.Content :class="styles.Content">
        <Listbox.Item v-for="item in collection.items" :key="item.value" :class="styles.Item" :item="item">
          <Listbox.ItemText :class="styles.ItemText">{{ item.label }}</Listbox.ItemText>
          <Listbox.ItemIndicator :class="styles.ItemIndicator">
            <CheckIcon />
          </Listbox.ItemIndicator>
        </Listbox.Item>
      </Listbox.Content>
    </Listbox.RootProvider>
  </div>
</template>
