<script setup lang="ts">
import { type Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { nextTick, ref, Teleport } from 'vue'

interface Item {
  label: string
  value: string
  __new__?: boolean
}

const NEW_OPTION_VALUE = '[[new]]'
const createNewOption = (value: string): Item => ({ label: value, value: NEW_OPTION_VALUE })
const isNewOptionValue = (value: string) => value === NEW_OPTION_VALUE
const replaceNewOptionValue = (values: string[], value: string) =>
  values.map((v) => (v === NEW_OPTION_VALUE ? value : v))
const getNewOptionData = (inputValue: string): Item => ({ label: inputValue, value: inputValue, __new__: true })

const filterFn = useFilter({ sensitivity: 'base' })

const { collection, filter, upsert, update, remove } = useListCollection<Item>({
  initialItems: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ],
  filter: filterFn.value.contains,
})

const isValidNewOption = (inputValue: string) => {
  const exactOptionMatch =
    collection.value.items.filter((item) => item.label.toLowerCase() === inputValue.toLowerCase()).length > 0
  return !exactOptionMatch && inputValue.trim().length > 0
}

const selectedValue = ref<string[]>([])
const inputValue = ref('')

const handleInputChange = ({ inputValue: newInputValue, reason }: Combobox.InputValueChangeDetails) => {
  if (reason === 'input-change' || reason === 'item-select') {
    if (isValidNewOption(newInputValue)) {
      upsert(NEW_OPTION_VALUE, createNewOption(newInputValue))
    } else if (newInputValue.trim().length === 0) {
      remove(NEW_OPTION_VALUE)
    }
    filter(newInputValue)
  }
  inputValue.value = newInputValue
}

const handleOpenChange = ({ reason }: Combobox.OpenChangeDetails) => {
  if (reason === 'trigger-click') {
    filter('')
  }
}

const handleValueChange = async ({ value }: Combobox.ValueChangeDetails) => {
  await nextTick()
  selectedValue.value = replaceNewOptionValue(value, inputValue.value)
  if (value.includes(NEW_OPTION_VALUE)) {
    console.log('New Option Created', inputValue.value)
    update(NEW_OPTION_VALUE, getNewOptionData(inputValue.value))
  }
}
</script>

<template>
  <Combobox.Root
    :collection="collection"
    :value="selectedValue"
    :onInputValueChange="handleInputChange"
    :onOpenChange="handleOpenChange"
    :onValueChange="handleValueChange"
    allowCustomValue
  >
    <Combobox.Control>
      <Combobox.Input placeholder="Search..." />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
            <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item">
              <Combobox.ItemText v-if="isNewOptionValue(item.value)">+ Create "{{ item.label }}"</Combobox.ItemText>
              <Combobox.ItemText v-else>{{ item.label }} {{ item.__new__ ? NEW_OPTION_VALUE : '' }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
