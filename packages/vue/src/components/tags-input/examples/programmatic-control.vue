<script setup lang="ts">
import { TagsInput, useTagsInput } from '@ark-ui/vue/tags-input'
import { XIcon } from 'lucide-vue-next'
import styles from 'styles/tags-input.module.css'
import button from 'styles/button.module.css'

const tagsInput = useTagsInput()
</script>

<template>
  <div class="stack">
    <div>
      <button :class="button.Root" type="button" @click="tagsInput.addValue('React')">Add React</button>
      <button :class="button.Root" type="button" @click="tagsInput.addValue('Solid')">Add Solid</button>
      <button :class="button.Root" type="button" @click="tagsInput.setValue(['Vue', 'Svelte'])">
        Set to Vue & Svelte
      </button>
      <button :class="button.Root" type="button" @click="tagsInput.clearValue()">Clear All</button>
    </div>

    <TagsInput.RootProvider :value="tagsInput" :class="styles.Root">
      <TagsInput.Context v-slot="api">
        <TagsInput.Label :class="styles.Label">Frameworks</TagsInput.Label>
        <TagsInput.Control :class="styles.Control">
          <TagsInput.Item
            v-for="(value, index) in api.value"
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
    </TagsInput.RootProvider>
  </div>
</template>
