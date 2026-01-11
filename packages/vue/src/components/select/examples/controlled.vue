<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/select.module.css'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const collection = createListCollection<Item>({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
})
const value = ref<string[]>(['vue'])
</script>

<template>
  <Select.Root :class="styles.Root" :collection="collection" v-model="value">
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
          <Select.ItemGroup :class="styles.ItemGroup">
            <Select.ItemGroupLabel :class="styles.ItemGroupLabel">Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
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
