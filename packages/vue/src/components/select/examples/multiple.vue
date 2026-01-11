<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
})
</script>

<template>
  <Select.Root :class="styles.Root" :collection="frameworks" multiple>
    <Select.Label :class="styles.Label">Framework</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select" />
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
            <Select.Item v-for="item in frameworks.items" :key="item.value" :item="item" :class="styles.Item">
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
