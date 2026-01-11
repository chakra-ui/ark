<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/checkbox.module.css'

const value = ref(['react'])

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]
</script>

<template>
  <div>
    <Checkbox.Group :class="styles.Group" v-model="value" name="framework">
      <Checkbox.Root :class="styles.Root" v-for="item in items" :value="item.value" :key="item.value">
        <Checkbox.Control :class="styles.Control">
          <Checkbox.Indicator :class="styles.Indicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label :class="styles.Label">{{ item.label }}</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Checkbox.Group>
    <pre>Selected: {{ JSON.stringify(value) }}</pre>
  </div>
</template>
