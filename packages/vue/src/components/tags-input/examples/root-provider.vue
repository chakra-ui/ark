<script setup lang="ts">
import { TagsInput, useTagsInput } from '@ark-ui/vue/tags-input'

const tagsInput = useTagsInput()
</script>

<template>
  <button @click="tagsInput.focus()">Focus</button>

  <TagsInput.RootProvider :value="tagsInput">
    <TagsInput.Context v-slot="tagsInput">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Item
          v-for="(value, index) in tagsInput.value"
          :key="index"
          :index="index"
          :value="value"
        >
          <TagsInput.ItemPreview>
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput />
        </TagsInput.Item>
        <TagsInput.Input placeholder="Add Framework" />
        <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
      </TagsInput.Control>
    </TagsInput.Context>
    <TagsInput.HiddenInput />
  </TagsInput.RootProvider>
</template>
