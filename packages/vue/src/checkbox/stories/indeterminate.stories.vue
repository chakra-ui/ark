<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '..'
import '../checkbox.css'

const parentChecked = ref(false)
const someChecked = ref(false)
const childItems = reactive([false, false])

watch(childItems, (items) => {
  parentChecked.value = items.every(Boolean)
  someChecked.value = items.some(Boolean) && !parentChecked.value
})

watch(
  () => parentChecked.value,
  (parentVal) => {
    if (someChecked.value && !parentVal) return
    childItems.map((_, idx) => {
      childItems[idx] = parentVal
    })
    return
  },
)
</script>
<template>
  <Story title="Checkbox - Indeterminate">
    <Checkbox v-model="parentChecked" :indeterminate="someChecked">
      <CheckboxLabel>Parent Checkbox</CheckboxLabel>
      <CheckboxInput />
      <CheckboxControl />
    </Checkbox>
    <div>
      <Checkbox v-model="childItems[0]">
        <CheckboxLabel>Child One Checkbox</CheckboxLabel>
        <CheckboxInput />
        <CheckboxControl />
      </Checkbox>
      <Checkbox v-model="childItems[1]">
        <CheckboxLabel>Child Two Checkbox</CheckboxLabel>
        <CheckboxInput />
        <CheckboxControl />
      </Checkbox>
    </div>
  </Story>
</template>
