<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/checkbox.module.css'

const value = ref<string[]>([])

const handleSelectAll = (checked: boolean) => {
  value.value = checked ? items.map((item) => item.value) : []
}

const allSelected = computed(() => value.value.length === items.length)
const indeterminate = computed(() => value.value.length > 0 && value.value.length < items.length)

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <output>Selected: {{ JSON.stringify(value) }}</output>

    <Checkbox.Root
      :class="styles.Root"
      :checked="indeterminate ? 'indeterminate' : allSelected"
      @checked-change="(e) => handleSelectAll(!!e.checked)"
    >
      <Checkbox.Control :class="styles.Control">
        <Checkbox.Indicator :class="styles.Indicator">
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator :class="styles.Indicator" indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label :class="styles.Label">JSX Frameworks</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>

    <Checkbox.Group :class="styles.Group" style="margin-inline-start: 1rem" v-model="value" name="framework">
      <Checkbox.Root :class="styles.Root" v-for="item in items" :key="item.value" :value="item.value">
        <Checkbox.Control :class="styles.Control">
          <Checkbox.Indicator :class="styles.Indicator">
            <CheckIcon />
          </Checkbox.Indicator>
          <Checkbox.Indicator :class="styles.Indicator" indeterminate>
            <MinusIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label :class="styles.Label">{{ item.label }}</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Checkbox.Group>
  </div>
</template>
