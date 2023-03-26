<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import CheckIcon from './CheckIcon.vue'
import MinusIcon from './MinusIcon.vue'
import '../checkbox.css'

const parentChecked = ref(false)
const someChecked = ref(false)
const childCheckedItems = reactive([false, false])

watch(childCheckedItems, (items) => {
  parentChecked.value = items.every(Boolean)
  someChecked.value = items.some(Boolean) && !parentChecked.value
})

watch(
  () => parentChecked.value,
  (parentVal) => {
    if (someChecked.value && !parentVal) return
    childCheckedItems.map((_, idx) => {
      childCheckedItems[idx] = parentVal
    })
    return
  },
)
</script>
<template>
  <Checkbox v-model:checked="parentChecked" v-model:indeterminate="someChecked">
    <CheckboxLabel>Parent Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl data-testid="parent-control">
      <CheckIcon v-if="parentChecked" />
      <MinusIcon v-else-if="someChecked" />
    </CheckboxControl>
  </Checkbox>
  <div>
    <Checkbox v-model:checked="childCheckedItems[0]">
      <CheckboxLabel>Child One Checkbox</CheckboxLabel>
      <CheckboxInput data-testid="child-one-input" />
      <CheckboxControl>
        <CheckIcon v-if="childCheckedItems[0]" />
      </CheckboxControl>
    </Checkbox>
    <Checkbox v-model:checked="childCheckedItems[1]">
      <CheckboxLabel>Child Two Checkbox</CheckboxLabel>
      <CheckboxInput data-testid="child-two-input" />
      <CheckboxControl>
        <CheckIcon v-if="childCheckedItems[1]" />
      </CheckboxControl>
    </Checkbox>
  </div>
</template>
