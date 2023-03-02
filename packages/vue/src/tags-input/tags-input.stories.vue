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
  UseTagsInputReturn,
} from '.'
import './tags-input.css'

const tagsInputRef = ref<{ context: UseTagsInputReturn }>()

const values = ref<string[]>(['react', 'solid', 'vue'])
</script>
<template>
  <TagsInput ref="tagsInputRef" v-model="values">
    <TagsInputLabel>Label</TagsInputLabel>
    <TagsInputControl>
      <template v-for="(value, index) in tagsInputRef?.context.value">
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
