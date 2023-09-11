<script setup lang="ts">
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
} from './'
import './combobox.css'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
]
</script>

<template>
  <Story title="Combobox">
    <Variant title="Basic">
      <Combobox :items="items">
        <ComboboxLabel>Framework</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxTrigger>Open</ComboboxTrigger>
          <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
        </ComboboxControl>
        <Teleport to="body">
          <ComboboxPositioner>
            <ComboboxContent>
              <ComboboxItemGroup id="framework">
                <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
                <ComboboxItem v-for="item in items" :key="item.value" :item="item">
                  <ComboboxItemText>{{ item.label }}</ComboboxItemText>
                  <ComboboxItemIndicator>✓</ComboboxItemIndicator>
                </ComboboxItem>
              </ComboboxItemGroup>
            </ComboboxContent>
          </ComboboxPositioner>
        </Teleport>
      </Combobox>
    </Variant>
  </Story>
</template>
