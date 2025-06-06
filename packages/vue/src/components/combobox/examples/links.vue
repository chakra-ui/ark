<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Combobox, createListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { computed, ref } from 'vue'

const initialItems = [
  { label: 'React', href: 'https://react.dev', value: 'react' },
  { label: 'Solid', href: 'https://solidjs.com', value: 'solid' },
  { label: 'Vue', href: 'https://vuejs.org', value: 'vue' },
  { label: 'Svelte', href: 'https://svelte.dev', value: 'svelte' },
  { label: 'Angular', href: 'https://angular.io', value: 'angular' },
  { label: 'Ember', href: 'https://emberjs.com', value: 'ember' },
  { label: 'Backbone', href: 'https://backbonejs.org', value: 'backbone' },
  { label: 'Polymer', href: 'https://polymer-project.org', value: 'polymer' },
  { label: 'Preact', href: 'https://preactjs.com', value: 'preact' },
  { label: 'Alpine', href: 'https://alpinejs.dev', value: 'alpine' },
  { label: 'Lit', href: 'https://lit.dev', value: 'lit' },
  { label: 'Qwik', href: 'https://qwik.builder.io', value: 'qwik' },
  { label: 'Astro', href: 'https://astro.build', value: 'astro' },
]

const items = ref(initialItems)

const collection = computed(() => createListCollection({ items: items.value }))

const filter = useFilter({ sensitivity: 'base' })

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  items.value = initialItems.filter((item) => filter.value.contains(item.label, details.inputValue))
}
</script>

<template>
  <Combobox.Root :collection="collection" @input-value-change="handleInputChange" selection-behavior="preserve">
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input />
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item" as-child>
            <a :href="item.href">
              <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </a>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
