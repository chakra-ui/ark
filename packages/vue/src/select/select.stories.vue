<script setup lang="ts">
import { ref } from 'vue'
import {
  Select,
  SelectTrigger,
  SelectLabel,
  SelectPositioner,
  SelectContent,
  SelectOption,
  type SelectProps,
} from './index'

const selectedOption = ref<SelectProps['modelValue']>()
</script>
<template>
  <Select v-model="selectedOption">
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
