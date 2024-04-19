<script setup lang="ts">
import { ref } from 'vue'
import {
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
  TagsInputRoot,
} from '..'

const frameworks = ref(['react', 'solid', 'vue'])
</script>

<template>
  <TagsInputRoot v-model="frameworks">
    <TagsInputContext  v-slot="tagsInput">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItem
        v-for="(value, index) in tagsInput.value"
        :key="index"
        :index="index"
        :value="value"
      >
        <TagsInputItemPreview>
          <TagsInputItemText>{{ value }}</TagsInputItemText>
          <TagsInputItemDeleteTrigger>Delete</TagsInputItemDeleteTrigger>
        </TagsInputItemPreview>
        <TagsInputItemInput />
      </TagsInputItem>
      <TagsInputInput placeholder="Add tag" />
      <TagsInputClearTrigger>Clear all</TagsInputClearTrigger>
    </TagsInputControl>
    </TagsInputContext>
  </TagsInputRoot>
</template>
