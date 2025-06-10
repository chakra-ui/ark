<script setup lang="ts">
import { Listbox, type ListboxRootEmits, type ListboxRootProps, createListCollection } from '../..'
import { useForwardPropsEmits } from '../../..'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const props = defineProps<Omit<ListboxRootProps<Item>, 'collection'>>()
const emits = defineEmits<ListboxRootEmits<Item>>()
const localProps = useForwardPropsEmits(props, emits)

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte', disabled: true },
    { label: 'Vue', value: 'vue' },
  ],
})
</script>

<template>
  <Listbox.Root :collection="collection" v-bind="localProps">
    <Listbox.Label>
      Select your Framework:
      <Listbox.ValueText />
    </Listbox.Label>
    <Listbox.Content>
      <Listbox.ItemGroup>
        <Listbox.ItemGroupLabel>JS Frameworks</Listbox.ItemGroupLabel>
        <Listbox.Item v-for="item in collection.items" :key="item.value" :item="item">
          <Listbox.ItemText>{{ item.label }}</Listbox.ItemText>
          <Listbox.ItemIndicator />
        </Listbox.Item>
      </Listbox.ItemGroup>
    </Listbox.Content>
  </Listbox.Root>
</template>
