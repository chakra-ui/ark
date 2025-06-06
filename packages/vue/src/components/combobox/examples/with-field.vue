<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Combobox, createListCollection } from '@ark-ui/vue/combobox'
import { Field } from '@ark-ui/vue/field'
import { useFilter } from '@ark-ui/vue/locale'
import { computed, ref } from 'vue'

const initialItems = ['React', 'Solid', 'Vue']

const items = ref(initialItems)

const collection = computed(() => createListCollection({ items: items.value }))

const filter = useFilter({ sensitivity: 'base' })

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  items.value = initialItems.filter((item) => filter.value.contains(item, details.inputValue))
}
</script>

<template>
  <Field.Root>
    <Combobox.Root :collection="collection" @input-value-change="handleInputChange">
      <Combobox.Label>Label</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
            <Combobox.Item v-for="item in collection.items" :key="item" :item="item">
              <Combobox.ItemText>{{ item }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
