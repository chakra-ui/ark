<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import CheckIcon from './CheckIcon.vue'
import MinusIcon from './MinusIcon.vue'
import '../checkbox.css'
import type { CheckedState } from '@zag-js/checkbox/dist/checkbox.types'

const parentChecked = ref<CheckedState>(false)
const childCheckedItems = reactive([false, false])

watch(childCheckedItems, (items) => {
  parentChecked.value = items.every(Boolean)
    ? true
    : items.indexOf(true) < 0
    ? false
    : 'indeterminate'
})

watch(parentChecked, (parentVal) => {
  if (parentVal === 'indeterminate') return
  childCheckedItems.map((_, idx) => {
    childCheckedItems[idx] = parentVal
  })
  return
})
</script>

<template>
  <div style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px">
    <Checkbox v-model="parentChecked">
      <CheckboxControl data-testid="parent-control">
        <CheckIcon v-if="parentChecked === true" />
        <MinusIcon v-else-if="parentChecked === 'indeterminate'" />
      </CheckboxControl>
      <CheckboxLabel> Parent Checkbox</CheckboxLabel>
      <CheckboxInput />
    </Checkbox>
    <div style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px">
      <Checkbox v-model="childCheckedItems[0]">
        <CheckboxControl>
          <CheckIcon v-if="childCheckedItems[0]" />
        </CheckboxControl>
        <CheckboxLabel> Child One Checkbox</CheckboxLabel>
        <CheckboxInput data-testid="child-one-input" />
      </Checkbox>
      <Checkbox v-model="childCheckedItems[1]">
        <CheckboxControl>
          <CheckIcon v-if="childCheckedItems[1]" />
        </CheckboxControl>
        <CheckboxLabel>Child Two Checkbox</CheckboxLabel>
        <CheckboxInput data-testid="child-two-input" />
      </Checkbox>
    </div>
  </div>
</template>
