<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptionProps,
  ComboboxPositioner,
  ComboboxProps,
  ComboboxTrigger,
} from './'
import './combobox.css'
import type { UseComboboxReturn } from './use-combobox'

type ComboboxData = Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[]

const comboboxData: ComboboxData = [
  { label: 'ReactJS', value: 'react' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'VueJS', value: 'vue', disabled: true },
  { label: 'AngularJS', value: 'angular' },
]

const options = ref(comboboxData)

const comboboxRef = ref<UseComboboxReturn | null>(null)

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
    ref="comboboxRef"
    @input-change="handleInputChange"
    @select="handleOnSelect"
    v-model="defaultVal"
  >
    <ComboboxLabel>JS Frameworks</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput />
      <ComboboxTrigger>
        <button>▼</button>
      </ComboboxTrigger>
    </ComboboxControl>
    <div v-show="comboboxRef?.isInputValueEmpty && !comboboxRef?.isOpen">
      Give me you favorite framework!
    </div>
    <Teleport to="body">
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxOption
            v-for="(item, idx) in options"
            :key="`${item.value}:${idx}`"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </ComboboxOption>
        </ComboboxContent>
      </ComboboxPositioner>
    </Teleport>
  </Combobox>
</template>
