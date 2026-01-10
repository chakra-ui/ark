<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, type UseComboboxProps, useCombobox, useListCollection } from '@ark-ui/vue/combobox'
import { computed, ref, watch, watchEffect } from 'vue'
import styles from 'styles/combobox.module.css'
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

let hydrated = false
watchEffect(() => {
  if (combobox.value.value.length && combobox.value.collection.size && !hydrated) {
    combobox.value.syncSelectedItems()
    hydrated = true
  }
})
</script>

<template>
  <Combobox.RootProvider :class="styles.Root" :value="combobox">
    <Combobox.Label :class="styles.Label">Search Star Wars Characters</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. Luke" />
    </Combobox.Control>

    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <span v-if="state.loading.value" style="padding: 0.5rem">Loading...</span>
          <span v-else-if="state.error.value" style="padding: 0.5rem">{{ state.error.value.message }}</span>
          <template v-else>
            <Combobox.Item v-for="item in collection.items" :key="item.name" :item="item" :class="styles.Item">
              <Combobox.ItemText :class="styles.ItemText">
                {{ item.name }} - {{ item.height }}cm / {{ item.mass }}kg
              </Combobox.ItemText>
              <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </template>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.RootProvider>
</template>
