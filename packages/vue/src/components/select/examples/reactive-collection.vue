<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon, PlusIcon, MinusIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/select.module.css'
import button from 'styles/button.module.css'

const itemsBase = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte', disabled: true },
    { label: 'Vue', value: 'vue' },
  ],
})

const number = ref(0)

const inc = () => number.value++
const dec = () => number.value--

const collection = computed(() => {
  const newItems = itemsBase.items.map((item) => ({
    ...item,
    label: `${item.label}-${number.value}`,
  }))
  return createListCollection({ items: newItems })
})
</script>

<template>
  <div>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; align-items: center">
      <button :class="button.Root" type="button" @click="inc">
        <PlusIcon />
      </button>
      <button :class="button.Root" type="button" @click="dec">
        <MinusIcon />
      </button>
      <span style="margin-left: 1rem">Number: {{ number }}</span>
    </div>
    <Select.Root :class="styles.Root" :positioning="{ sameWidth: true }" :collection="collection">
      <Select.Label :class="styles.Label">Framework</Select.Label>
      <Select.Control :class="styles.Control">
        <Select.Trigger :class="styles.Trigger">
          <Select.ValueText :class="styles.ValueText" placeholder="Select a Framework" />
          <Select.Indicator :class="styles.Indicator">
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content :class="styles.Content">
          <Select.ItemGroup :class="styles.ItemGroup">
            <Select.ItemGroupLabel :class="styles.ItemGroupLabel">Framework</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :item="item" :key="item.label" :class="styles.Item">
              <Select.ItemText :class="styles.ItemText">{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  </div>
</template>
