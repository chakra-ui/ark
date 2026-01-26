<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { nextTick, ref } from 'vue'
import styles from 'styles/combobox.module.css'

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
    { label: 'Bug', value: 'bug' },
    { label: 'Feature', value: 'feature' },
    { label: 'Enhancement', value: 'enhancement' },
    { label: 'Documentation', value: 'docs' },
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
    :class="styles.Root"
    :collection="collection"
    :model-value="selectedValue"
    :onInputValueChange="handleInputChange"
    :onOpenChange="handleOpenChange"
    :onValueChange="handleValueChange"
    allowCustomValue
  >
    <Combobox.Label :class="styles.Label">Label</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. Bug" />
      <div :class="styles.Indicators">
        <Combobox.ClearTrigger :class="styles.ClearTrigger">Clear</Combobox.ClearTrigger>
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
            <Combobox.ItemText v-if="isNewOptionValue(item.value)" :class="styles.ItemText">
              + Create "{{ item.label }}"
            </Combobox.ItemText>
            <Combobox.ItemText v-else :class="styles.ItemText">
              {{ item.label }} {{ item.__new__ ? '(new)' : '' }}
            </Combobox.ItemText>
            <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
