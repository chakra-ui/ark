<script setup lang="ts">
import { TagsInput } from '../..'
</script>

<template>
  <TagsInput.Root
    v-slot="api"
    :validate="
      (details) => {
        return !details.value.includes(details.inputValue)
      }
    "
  >
    <TagsInput.Label>Frameworks</TagsInput.Label>
    <TagsInput.Control>
      <TagsInput.Item
        v-for="(value, index) in api.value"
        :key="index"
        :index="index"
        :value="value"
      >
        <TagsInput.ItemInput />
        <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
        <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
      </TagsInput.Item>
      <TagsInput.Input placeholder="Add Framework" />
      <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
    </TagsInput.Control>
  </TagsInput.Root>
</template>
