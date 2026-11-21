<script setup lang="ts">
import { Command, type CommandRootEmits, type CommandRootProps, createListCollection } from '@ark-ui/vue/command'
import { useForwardPropsEmits } from '@ark-ui/vue'

interface Item {
  label: string
  value: string
  group: string
  disabled?: boolean | undefined
  keywords?: string[] | undefined
  parent?: string | undefined
}

const props = defineProps<Partial<CommandRootProps<Item>>>()
const emits = defineEmits<CommandRootEmits<Item>>()
const localProps = useForwardPropsEmits(props, emits)

const collection = createListCollection<Item>({
  items: [
    { label: 'New file', value: 'new-file', group: 'File' },
    { label: 'Save', value: 'save', group: 'File', keywords: ['write'] },
    { label: 'Print', value: 'print', group: 'File', disabled: true },
    { label: 'Zoom in', value: 'zoom-in', group: 'View' },
    { label: 'Theme', value: 'theme', group: 'View' },
    { label: 'Dark', value: 'dark', group: 'Theme', parent: 'theme' },
    { label: 'Light', value: 'light', group: 'Theme', parent: 'theme' },
  ],
  groupBy: (item) => item.group,
})
</script>

<template>
  <Command.Root :collection="collection" v-bind="localProps">
    <Command.Label>Commands</Command.Label>
    <Command.Control>
      <Command.Input placeholder="Search" />
    </Command.Control>
    <Command.Context v-slot="command">
      <Command.List>
        <Command.ItemGroup v-for="[group, items] in command.collection.group()" :key="group">
          <Command.ItemGroupLabel>{{ group }}</Command.ItemGroupLabel>
          <Command.Item v-for="item in items" :key="item.value" :item="item">
            <Command.ItemText>{{ item.label }}</Command.ItemText>
          </Command.Item>
        </Command.ItemGroup>
      </Command.List>
    </Command.Context>
    <Command.Empty>No results</Command.Empty>
  </Command.Root>
</template>
