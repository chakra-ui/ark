<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Alpine'],
})
</script>

<template>
  <Select.Root :class="styles.Root" :collection="collection" :lazy-mount="true" :unmount-on-exit="true">
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
        <Select.Content :class="styles.Content">
          <Select.ItemGroup :class="styles.ItemGroup">
            <Select.ItemGroupLabel :class="styles.ItemGroupLabel">Frameworks</Select.ItemGroupLabel>
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
