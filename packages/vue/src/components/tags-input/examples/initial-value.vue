<script setup lang="ts">
import { ref } from 'vue'
import { TagsInput } from '../..'

const frameworks = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <TagsInput.Root v-model="frameworks">
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
    <TagsInput.HiddenInput />
  </TagsInput.Root>
</template>
