<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel, type CheckboxProps } from '..'
import CheckIcon from './CheckIcon.vue'
import MinusIcon from './MinusIcon.vue'
import '../checkbox.css'

const parentChecked = ref<CheckboxProps['modelValue']>(false)
const childCheckedItems = reactive<CheckboxProps['modelValue'][]>([false, false])

watch(childCheckedItems, (items) => {
  if (items.indexOf(true) < 0) {
    parentChecked.value = false
    return
  }
  parentChecked.value = items.every(Boolean) ? true : 'indeterminate'
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
