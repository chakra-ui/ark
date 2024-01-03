<script setup lang="ts">
import { ref } from 'vue'
import { Combobox } from '../'
import './combobox.css'

const basicItems = ref(['React', 'Solid', 'Vue'])

const advancedItems = ref([
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
])
</script>

<template>
  <Story title="Combobox">
    <Variant title="Basic">
      <Combobox.Root :items="basicItems">
        <Combobox.Label>Framework</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>Open</Combobox.Trigger>
          <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
        </Combobox.Control>
        <Teleport to="body">
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.ItemGroup id="framework">
                <Combobox.ItemGroupLabel htmlFor="framework">Frameworks</Combobox.ItemGroupLabel>
                <Combobox.Item v-for="item in basicItems" :key="item" :item="item">
                  <Combobox.ItemText>{{ item }}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              </Combobox.ItemGroup>
            </Combobox.Content>
          </Combobox.Positioner>
        </Teleport>
      </Combobox.Root>
    </Variant>

    <Variant title="Advanced">
      <Combobox.Root :items="advancedItems">
        <Combobox.Label>Framework</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>Open</Combobox.Trigger>
          <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
        </Combobox.Control>
        <Teleport to="body">
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.ItemGroup id="framework">
                <Combobox.ItemGroupLabel htmlFor="framework">Frameworks</Combobox.ItemGroupLabel>
                <Combobox.Item v-for="item in advancedItems" :key="item.value" :item="item">
                  <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              </Combobox.ItemGroup>
            </Combobox.Content>
          </Combobox.Positioner>
        </Teleport>
      </Combobox.Root>
    </Variant>
  </Story>
</template>
