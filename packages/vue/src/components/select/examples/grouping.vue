<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react', type: 'JS' },
    { label: 'Solid', value: 'solid', type: 'JS' },
    { label: 'Vue', value: 'vue', type: 'JS' },
    { label: 'Panda', value: 'panda', type: 'CSS' },
    { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
  ],
  groupBy: (item) => item.type,
})
</script>

<template>
  <Select.Root :class="styles.Root" :collection="collection">
    <Select.Label :class="styles.Label">Framework</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select a Framework" />
      </Select.Trigger>
      <div :class="styles.Indicators">
        <Select.ClearTrigger :class="styles.ClearTrigger">
          <XIcon />
        </Select.ClearTrigger>
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </div>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content :class="styles.Content">
          <Select.ItemGroup v-for="[type, group] in collection.group()" :key="type" :class="styles.ItemGroup">
            <Select.ItemGroupLabel :class="styles.ItemGroupLabel">{{ type }}</Select.ItemGroupLabel>
            <Select.Item v-for="item in group" :key="item.value" :item="item" :class="styles.Item">
              <Select.ItemText :class="styles.ItemText">{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
