<script setup lang="ts">
import { ref } from 'vue'
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemText,
  TagsInputLabel,
} from '../'

const frameworks = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <TagsInput v-slot="api" v-model="frameworks">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItem
        v-for="(value, index) in api.value ?? []"
        :key="index"
        :index="index"
        :value="value"
      >
        <TagsInputItemInput />
        <TagsInputItemText>{{ value }}</TagsInputItemText>
        <TagsInputItemDeleteTrigger>Delete</TagsInputItemDeleteTrigger>
      </TagsInputItem>
      <TagsInputInput placeholder="Add Framework" />
      <TagsInputClearTrigger>Clear All</TagsInputClearTrigger>
    </TagsInputControl>
  </TagsInput>
</template>
