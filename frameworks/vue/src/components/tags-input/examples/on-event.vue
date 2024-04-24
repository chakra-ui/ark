<script setup lang="ts">
import { TagsInput } from '../..'
</script>

<template>
  <TagsInput.Root
    @value-change="(details) => console.log(details)"
    @highlight-change="(details) => console.log(details)"
    @value-invalid="(details) => console.log(details)"
  >
    <TagsInput.Context v-slot="tagsInput">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Item
          v-for="(value, index) in tagsInput.value"
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
    </TagsInput.Context>
  </TagsInput.Root>
</template>
