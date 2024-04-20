<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, type CheckboxState } from '../..'

const checked = ref<CheckboxState>(false)

const childCheckedItems = ref([false, false])

const parentChecked = computed({
  get() {
    return childCheckedItems.value.every(Boolean)
      ? true
      : childCheckedItems.value.some(Boolean)
        ? 'indeterminate'
        : false
  },
  set(val: CheckboxState) {
    if (val === 'indeterminate') return
    childCheckedItems.value = childCheckedItems.value.map(() => val)
  },
})
</script>

<template>
  <Checkbox.Root default-checked>
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
</template>
