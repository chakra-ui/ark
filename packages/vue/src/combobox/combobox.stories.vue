<script setup lang="ts">
import { ref } from 'vue'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptionGroup,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxOptionProps,
  type ComboboxProps,
} from './'
import './combobox.css'

type ComboboxData = Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[]

const comboboxData: ComboboxData = [
  { label: 'ReactJS', value: 'react' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'VueJS', value: 'vue' },
  { label: 'AngularJS', value: 'angular', disabled: true },
]

const options = ref(comboboxData)

const handleInputChange: ComboboxProps['onInputChange'] = ({ value }) => {
  const filtered = comboboxData.filter((item) =>
    item.label.toLowerCase().includes(value.toLowerCase()),
  )

  options.value = filtered.length > 0 ? filtered : comboboxData
}

const handleOnSelect: ComboboxProps['onSelect'] = () => {
  // Return list back to default once option is selected
  options.value = comboboxData
}

const defaultVal = ref(comboboxData[0].label)
</script>
<template>
  <Combobox
    @input-change="handleInputChange"
    @select="handleOnSelect"
    v-model="defaultVal"
    v-slot="{ isInputValueEmpty, isOpen }"
  >
    <ComboboxLabel>JS Frameworks</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput />
      <ComboboxTrigger>
        <button>▼</button>
      </ComboboxTrigger>
      <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
    </ComboboxControl>
    <div v-show="isInputValueEmpty && !isOpen">Give me you favorite framework!</div>
    <Teleport to="body">
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxOptionGroup id="framework">
            <ComboboxOptionGroupLabel htmlFor="framework">Frameworks</ComboboxOptionGroupLabel>
            <ComboboxOption
              v-for="(item, idx) in options"
              :key="`${item.value}:${idx}`"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </ComboboxOption>
          </ComboboxOptionGroup>
        </ComboboxContent>
      </ComboboxPositioner>
    </Teleport>
  </Combobox>
</template>
