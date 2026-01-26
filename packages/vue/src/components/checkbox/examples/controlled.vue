<script setup lang="ts">
import { Checkbox, type CheckboxCheckedState } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/checkbox.module.css'

const checked = ref<CheckboxCheckedState>(true)
</script>

<template>
  <Checkbox.Root :class="styles.Root" v-model:checked="checked">
    <Checkbox.Control :class="styles.Control">
      <Checkbox.Indicator :class="styles.Indicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label :class="styles.Label">Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
