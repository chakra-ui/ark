<script setup lang="ts">
import { ref } from 'vue'
import { TagsInput } from '../'

const frameworks = ref(['react', 'solid', 'vue'])
</script>

<template>
  <TagsInput.Root v-slot="api" v-model="frameworks">
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
      <TagsInput.Input placeholder="Add tag" />
      <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
    </TagsInput.Control>
  </TagsInput.Root>
</template>
