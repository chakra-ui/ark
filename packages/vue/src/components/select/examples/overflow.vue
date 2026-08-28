<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'

const collection = createListCollection({
  items: [
    'Name 1',
    'Name 2',
    'Name 3',
    'Name 4',
    'Name 5',
    'Name 6',
    'Name 7',
    'Name 8',
    'Name 9',
    'Name 10',
    'Name 11',
    'Name 12',
    'Name 13',
    'Name 14',
  ],
})
</script>

<template>
  <Select.Root
    :class="styles.Root"
    :collection="collection"
    :positioning="{
      fitViewport: true,
      placement: 'bottom-start',
      sameWidth: true,
    }"
  >
    <Select.Label :class="styles.Label">Framework</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select a Framework" />
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger :class="styles.ClearTrigger">Clear</Select.ClearTrigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content :class="styles.Content" :style="{ maxHeight: '200px' }">
          <Select.ItemGroup :class="styles.ItemGroup">
            <Select.ItemGroupLabel :class="styles.ItemGroupLabel">Names</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
              <Select.ItemText :class="styles.ItemText">{{ item }}</Select.ItemText>
              <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
