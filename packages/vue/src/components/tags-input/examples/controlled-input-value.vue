<script setup lang="ts">
import { TagsInput } from '@ark-ui/vue/tags-input'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const inputValue = ref('')
</script>

<template>
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 12px">
      <button type="button" @click="inputValue = 'React'">Set to "React"</button>
      <button type="button" @click="inputValue = ''">Clear Input</button>
      <span style="font-size: 14px; margin-left: 8px">Current input: "{{ inputValue }}"</span>
    </div>

    <TagsInput.Root :input-value="inputValue" @input-value-change="(details) => (inputValue = details.inputValue)">
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
  </div>
</template>
