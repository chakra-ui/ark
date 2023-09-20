<script setup lang="ts">
import { ref } from 'vue'
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemText,
  TagsInputLabel,
} from './'
import './tags-input.css'
const frameworks = ref(['React', 'Solid', 'Vue'])
</script>
<template>
  <Story title="Tags Input">
    <Variant title="Basic">
      <TagsInput v-slot="api">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItem
            v-for="(value, index) in api.value ?? []"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInputItemInput />
            <TagsInputItemText>{{ value }}</TagsInputItemText>
            <TagsInputItemDeleteTrigger>Delete</TagsInputItemDeleteTrigger>
          </TagsInputItem>
          <TagsInputInput placeholder="Add Framework" />
          <TagsInputClearTrigger>Clear All</TagsInputClearTrigger>
        </TagsInputControl>
      </TagsInput>
    </Variant>
    <Variant title="InitialValue">
      <TagsInput v-slot="api" v-model="frameworks">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItem
            v-for="(value, index) in api.value ?? []"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInputItemInput />
            <TagsInputItemText>{{ value }}</TagsInputItemText>
            <TagsInputItemDeleteTrigger>Delete</TagsInputItemDeleteTrigger>
          </TagsInputItem>
          <TagsInputInput placeholder="Add Framework" />
          <TagsInputClearTrigger>Clear All</TagsInputClearTrigger>
        </TagsInputControl>
      </TagsInput>
    </Variant>
  </Story>
</template>
