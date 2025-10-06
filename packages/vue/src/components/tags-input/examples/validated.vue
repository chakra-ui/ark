<script setup lang="ts">
import { TagsInput } from '@ark-ui/vue/tags-input'
import { XIcon } from 'lucide-vue-next'
</script>

<template>
  <TagsInput.Root
    :validate="
      (details) => {
        return !details.value.includes(details.inputValue)
      }
    "
  >
    <TagsInput.Context v-slot="tagsInput">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Item v-for="(value, index) in tagsInput.value" :key="index" :index="index" :value="value">
          <TagsInput.ItemPreview>
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger><XIcon /></TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput />
        </TagsInput.Item>
        <TagsInput.Input placeholder="Add Framework" />
        <TagsInput.ClearTrigger><XIcon /></TagsInput.ClearTrigger>
      </TagsInput.Control>
    </TagsInput.Context>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
</template>
