<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

const value = ref<string[]>([])

const handleSelectAll = (checked: boolean) => {
  value.value = checked ? items.map((item) => item.value) : []
}

const allSelected = computed(() => value.value.length === items.length)
const indeterminate = computed(() => value.value.length > 0 && value.value.length < items.length)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <Checkbox.Root
      :checked="indeterminate ? 'indeterminate' : allSelected"
      @checked-change="(e) => handleSelectAll(!!e.checked)"
    >
      <Checkbox.Label>Select All</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>

    <Checkbox.Group v-model="value" name="framework">
      <Checkbox.Root v-for="item in items" :key="item.value" :value="item.value">
        <Checkbox.Label>{{ item.label }}</Checkbox.Label>
        <Checkbox.Control>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
          <Checkbox.Indicator indeterminate>
            <MinusIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Checkbox.Group>

    <pre>Selected: {{ JSON.stringify(value) }}</pre>
  </div>
</template>
