<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { computed, ref } from 'vue'

const items = ref(['React', 'Solid', 'Vue', 'Svelte'])

const collection = computed(() =>
  createListCollection({
    items: items.value,
  }),
)

const addItem = () => {
  items.value = [...items.value, 'Angular']
}
</script>

<template>
  <div>
    <Select.Root :collection="collection">
      <Select.Control>
        <Select.Label>Framework</Select.Label>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>▼</Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Teleport to="body">
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
              <Select.Item v-for="item in collection.items" :key="item" :item="item">
                <Select.ItemText>{{ item }}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Teleport>
    </Select.Root>

    <button type="button" @click="addItem">Add Item</button>
  </div>
</template>
