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
  <div style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px">
    <Checkbox.Root v-model:checked="parentChecked" v-slot="{ isChecked, isIndeterminate }">
      <Checkbox.Control>
        <span v-if="isChecked">✓</span>
        <span v-if="isIndeterminate">-</span>
      </Checkbox.Control>
      <Checkbox.Label> Parent Checkbox</Checkbox.Label>
    </Checkbox.Root>
    <div style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px">
      <Checkbox.Root v-model:checked="childCheckedItems[0]" v-slot="{ isChecked }">
        <Checkbox.Control>
          <span v-if="isChecked">✓</span>
        </Checkbox.Control>
        <Checkbox.Label> Child One Checkbox</Checkbox.Label>
      </Checkbox.Root>
      <Checkbox.Root v-model:checked="childCheckedItems[1]" v-slot="{ isChecked }">
        <Checkbox.Control>
          <span v-if="isChecked">✓</span>
        </Checkbox.Control>
        <Checkbox.Label>Child Two Checkbox</Checkbox.Label>
      </Checkbox.Root>
    </div>
  </div>
</template>
