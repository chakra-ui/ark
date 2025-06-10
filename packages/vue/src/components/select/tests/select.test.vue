<script setup lang="ts">
import { Select, type SelectRootEmits, type SelectRootProps, createListCollection } from '../..'
import { useForwardPropsEmits } from '../../..'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const collection = createListCollection<Item>({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
})

const props = defineProps<Omit<SelectRootProps<Item>, 'collection'>>()
const emits = defineEmits<SelectRootEmits<Item>>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Select.Root :collection="collection" :openDelay="0" :closeDelay="0" v-bind="localProps">
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
        <Select.Indicator>ChevronDownIcon</Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner data-testid="positioner">
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
          <Select.List />
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
