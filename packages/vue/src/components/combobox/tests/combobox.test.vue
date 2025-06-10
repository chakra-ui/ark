<script setup lang="ts">
import { ref } from 'vue'
import { Combobox, type ComboboxRootEmits, type ComboboxRootProps, createListCollection } from '../..'
import { useForwardPropsEmits } from '../../..'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const props = defineProps<ComboboxRootProps<Item>>()
const emits = defineEmits<ComboboxRootEmits<Item>>()
const localProps = useForwardPropsEmits(props, emits)

const frameworks = createListCollection<Item>({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
})
const value = ref<string[]>([])
</script>

<template>
  <Combobox.Root :collection="frameworks" v-model="value" v-bind="localProps">
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input data-testid="input" />
      <Combobox.Trigger data-testid="trigger">Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner data-testid="positioner">
        <Combobox.Content>
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
            <Combobox.Item v-for="item in frameworks.items" :key="item.value" :item="item">
              <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
          <Combobox.List />
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
