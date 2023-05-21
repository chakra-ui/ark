<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectLabel,
  SelectPositioner,
  SelectContent,
  SelectOption,
  type SelectContext,
} from './index'
</script>
<template>
  <Select v-slot="{ selectedOption }: SelectContext">
    <SelectLabel>Framework:</SelectLabel>
    <SelectTrigger>
      <button>{{ selectedOption?.label ?? 'Select' }}</button>
    </SelectTrigger>

    <Teleport to="body">
      <SelectPositioner>
        <SelectContent>
          <SelectOption value="react" label="React" />
          <SelectOption value="solidjs" label="SolidJs" />
          <SelectOption value="vue" label="VueJS">VueJS</SelectOption>
        </SelectContent>
      </SelectPositioner>
    </Teleport>
  </Select>
</template>
