<script setup lang="ts">
import { TagsInput } from '@ark-ui/vue/tags-input'
import { XIcon } from 'lucide-vue-next'
import styles from 'styles/tags-input.module.css'
</script>

<template>
  <TagsInput.Root :class="styles.Root">
    <TagsInput.Context v-slot="tagsInput">
      <TagsInput.Label :class="styles.Label">Frameworks</TagsInput.Label>
      <TagsInput.Control :class="styles.Control">
        <TagsInput.Item
          v-for="(value, index) in tagsInput.value"
          :key="index"
          :index="index"
          :value="value"
          :class="styles.Item"
        >
          <TagsInput.ItemPreview :class="styles.ItemPreview">
            <TagsInput.ItemText :class="styles.ItemText">{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger :class="styles.ItemDeleteTrigger">
              <XIcon />
            </TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput :class="styles.ItemInput" />
        </TagsInput.Item>
        <TagsInput.Input placeholder="Add Framework" :class="styles.Input" />
        <TagsInput.ClearTrigger :class="styles.ClearTrigger">
          <XIcon />
        </TagsInput.ClearTrigger>
      </TagsInput.Control>
    </TagsInput.Context>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
</template>
