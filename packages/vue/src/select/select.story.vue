<script setup lang="ts">
import { collection } from '@zag-js/select'
import type { UnwrapRef } from 'vue'
import { Select, SelectContent, SelectItem, SelectLabel, SelectPositioner, SelectTrigger } from './'
import { SelectItemGroup } from './select-item-group'
import { SelectItemGroupLabel } from './select-item-group-label'
import './select.css'
import type { UseSelectReturn } from './use-select'

const frameworks = collection({ items: [{ value: 'React' }, { value: 'Solid' }, { value: 'Vue' }] })
</script>
<template>
  <Story title="Select">
    <Variant title="Basic">
      <Select v-slot="api: UnwrapRef<UseSelectReturn>" :collection="frameworks">
        <SelectLabel>Framework:</SelectLabel>
        <SelectTrigger>{{ api.hasSelectedItems ? 'XX' : 'Select option' }}</SelectTrigger>
        <Teleport to="body">
          <SelectPositioner>
            <SelectContent>
              <SelectItemGroup id="framework">
                <SelectItemGroupLabel html-for="framework">Framework</SelectItemGroupLabel>
                <SelectItem v-for="item in frameworks.toArray()" :key="item.value" :item="item">
                  {{ item.value }}
                </SelectItem>
              </SelectItemGroup>
            </SelectContent>
          </SelectPositioner>
        </Teleport>
      </Select>
    </Variant>
  </Story>
</template>
