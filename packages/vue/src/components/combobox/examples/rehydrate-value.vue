<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Combobox, type UseComboboxProps, useCombobox, useListCollection } from '@ark-ui/vue/combobox'
import { computed, ref, watch, watchEffect } from 'vue'
import { useAsync } from './use-async'

interface Character {
  name: string
  height: string
  mass: string
  created: string
  edited: string
  url: string
}

const inputValue = ref('')

const { collection, set } = useListCollection<Character>({
  initialItems: [],
  itemToString: (item) => item.name,
  itemToValue: (item) => item.name,
})

const combobox = useCombobox(
  computed<UseComboboxProps<Character>>(() => ({
    collection: collection.value,
    defaultValue: ['C-3PO'],
    placeholder: 'Example: Dexter',
    inputValue: inputValue.value,
    onInputValueChange: (e) => {
      inputValue.value = e.inputValue
    },
  })),
)

const fetchData = computed(() => async (signal: AbortSignal | null) => {
  const response = await fetch(`https://swapi.py4e.com/api/people/?search=${inputValue.value}`, { signal })
  const data = await response.json()
  set(data.results)
})

const state = useAsync(fetchData)

watch(inputValue, () => {
  state.load()
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  inputValue.value = details.inputValue
}

// The meat of the example is here.
// It rehydrates the input value when the combobox is mounted.
let hydrated = false
watchEffect(() => {
  if (combobox.value.value.length && combobox.value.collection.size && !hydrated) {
    combobox.value.syncSelectedItems()
    hydrated = true
  }
})
</script>

<template>
  <Combobox.Root
    :collection="collection"
    :default-value="['C-3PO']"
    placeholder="Example: Dexter"
    :input-value="inputValue"
    @input-value-change="handleInputChange"
  >
    <Combobox.Label>Search Star Wars Characters</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input placeholder="Type to search" />
    </Combobox.Control>

    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <span v-if="state.loading.value">Loading...</span>
          <span v-else-if="state.error.value">{{ state.error.value.message }}</span>
          <template v-else>
            <Combobox.Item v-for="item in collection.items" :key="item.name" :item="item">
              <span>{{ item.name }} - {{ item.height }}cm / {{ item.mass }}kg</span>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          </template>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
