<script setup lang="ts">
import { TagsInput, useTagsInput } from '@ark-ui/vue/tags-input'
import { XIcon } from 'lucide-vue-next'

const tagsInput = useTagsInput()
</script>

<template>
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 12px">
      <button type="button" @click="tagsInput.addValue('React')">Add React</button>
      <button type="button" @click="tagsInput.addValue('Solid')">Add Solid</button>
      <button type="button" @click="tagsInput.setValue(['Vue', 'Svelte'])">Set to Vue & Svelte</button>
      <button type="button" @click="tagsInput.clearValue()">Clear All</button>
    </div>

    <TagsInput.RootProvider :value="tagsInput">
      <TagsInput.Context v-slot="api">
        <TagsInput.Label>Frameworks (Programmatic Control)</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item v-for="(value, index) in api.value" :key="index" :index="index" :value="value">
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
    </TagsInput.RootProvider>
  </div>
</template>
