<script setup lang="ts">
import { Field, type FieldRootProps } from '@ark-ui/vue/field'
import { TagsInput } from '@ark-ui/vue/tags-input'
import { XIcon } from 'lucide-vue-next'

const props = defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="props">
    <TagsInput.Root>
      <TagsInput.Context v-slot="tagsInput">
        <TagsInput.Label>Label</TagsInput.Label>
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
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
