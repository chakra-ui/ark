<script setup lang="ts">
import { ref } from 'vue'
import {
  Tag,
  TagDeleteTrigger,
  TagInput,
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputField,
  TagsInputLabel,
} from '.'
import './tags-input.css'

const values = ref<string[]>(['react', 'solid', 'vue'])
</script>
<template>
  <TagsInput v-slot="{ value: v }" v-model="values">
    <TagsInputLabel>Label</TagsInputLabel>
    <TagsInputControl>
      <template v-for="(value, index) in v">
        <Tag :index="index" :value="value">
          <span>{{ value }}</span>
          <TagDeleteTrigger :index="index" :value="value">
            <button>&#x2715;</button>
          </TagDeleteTrigger>
        </Tag>
        <TagInput :index="index" :value="value" />
      </template>
      <TagsInputField placeholder="Add tag" />
      <TagsInputClearTrigger>
        <button>Clear all</button>
      </TagsInputClearTrigger>
    </TagsInputControl>
  </TagsInput>
</template>
