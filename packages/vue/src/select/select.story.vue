<script setup lang="ts">
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from './'
import './select.css'

const items = ['React', 'Solid', 'Vue']
</script>
<template>
  <Story title="Select">
    <Variant title="Basic">
      <Select :items="items">
        <SelectLabel>Framework</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a Framework" />
          </SelectTrigger>
          <SelectClearTrigger>Clear</SelectClearTrigger>
        </SelectControl>
        <Teleport to="body">
          <SelectPositioner>
            <SelectContent>
              <SelectItemGroup id="framework">
                <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
                <SelectItem v-for="item in items" :key="item" :item="item">
                  <SelectItemText>{{ item }}</SelectItemText>
                  <SelectItemIndicator>✓</SelectItemIndicator>
                </SelectItem>
              </SelectItemGroup>
            </SelectContent>
          </SelectPositioner>
        </Teleport>
      </Select>
    </Variant>
  </Story>
</template>
