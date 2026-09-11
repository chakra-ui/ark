<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember' },
    { label: 'Lit', value: 'lit' },
    { label: 'Preact', value: 'preact' },
    { label: 'Qwik', value: 'qwik' },
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Vue', value: 'vue' },
  ],
})
</script>

<template>
  <Select.Root align-item-with-trigger :class="styles.Root" :collection="frameworks" :default-value="['solid']">
    <Select.Label :class="styles.Label">Framework</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select" />
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content :class="styles.Content">
          <Select.ScrollArrow :class="styles.ScrollArrow" placement="top">
            <ChevronUpIcon />
          </Select.ScrollArrow>
          <Select.List :class="styles.List">
            <Select.Item v-for="item in frameworks.items" :key="item.value" :item="item" :class="styles.Item">
              <Select.ItemText :class="styles.ItemText">{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
            </Select.Item>
          </Select.List>
          <Select.ScrollArrow :class="styles.ScrollArrow" placement="bottom">
            <ChevronDownIcon />
          </Select.ScrollArrow>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
