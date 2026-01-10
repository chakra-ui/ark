<script setup lang="ts">
import { Combobox, useCombobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { TagsInput, useTagsInput } from '@ark-ui/vue/tags-input'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { useId } from 'vue'
import combobox from 'styles/combobox.module.css'
import styles from 'styles/tags-input.module.css'

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems: ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js', 'Astro', 'Nuxt'],
  filter: filters.value.contains,
})

const uid = useId()

const tagsInput = useTagsInput({
  ids: { input: `input_${uid}`, control: `control_${uid}` },
})

const comboboxApi = useCombobox({
  ids: { input: `input_${uid}`, control: `control_${uid}` },
  collection,
  onInputValueChange(details) {
    filter(details.inputValue)
  },
  value: [],
  allowCustomValue: true,
  onValueChange: (details) => {
    if (details.value[0]) {
      tagsInput.value.addValue(details.value[0])
    }
  },
  selectionBehavior: 'clear',
})
</script>

<template>
  <Combobox.RootProvider :value="comboboxApi">
    <TagsInput.RootProvider :class="styles.Root" :value="tagsInput">
      <TagsInput.Label :class="styles.Label">Frameworks</TagsInput.Label>
      <TagsInput.Control :class="styles.Control">
        <TagsInput.Item
          v-for="(value, index) in tagsInput.value.value"
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
        <Combobox.Input as-child>
          <TagsInput.Input placeholder="Add Framework" :class="styles.Input" />
        </Combobox.Input>
        <TagsInput.ClearTrigger :class="styles.ClearTrigger">
          <XIcon />
        </TagsInput.ClearTrigger>
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput.RootProvider>

    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="combobox.Content">
          <Combobox.Empty :class="combobox.Item">No frameworks found</Combobox.Empty>
          <Combobox.Item v-for="item in collection.items" :key="item" :item="item" :class="combobox.Item">
            <Combobox.ItemText :class="combobox.ItemText">{{ item }}</Combobox.ItemText>
            <Combobox.ItemIndicator :class="combobox.ItemIndicator">
              <CheckIcon />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.RootProvider>
</template>
