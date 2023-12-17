<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Checkbox, type CheckedState } from './'
import './checkbox.css'

const checked = ref<CheckedState>(false)
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
  <Story title="Checkbox">
    <Variant title="Basic">
      <Checkbox.Root defaultChecked>
        <Checkbox.Label>Checkbox</Checkbox.Label>
        <Checkbox.Control />
      </Checkbox.Root>
    </Variant>

    <Variant title="Controlled">
      <Checkbox.Root v-model="checked">
        <Checkbox.Label>Checkbox</Checkbox.Label>
        <Checkbox.Control />
      </Checkbox.Root>
    </Variant>

    <Variant title="Indeterminate">
      <div style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px">
        <Checkbox.Root v-model="parentChecked">
          <Checkbox.Control data-testid="parent-control">
            <span v-if="parentChecked === true">✓</span>
            <span v-else-if="parentChecked === 'indeterminate'">-</span>
          </Checkbox.Control>
          <Checkbox.Label> Parent Checkbox</Checkbox.Label>
        </Checkbox.Root>
        <div style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px">
          <Checkbox.Root v-model="childCheckedItems[0]">
            <Checkbox.Control>
              <span v-if="childCheckedItems[0]">✓</span>
            </Checkbox.Control>
            <Checkbox.Label> Child One Checkbox</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root v-model="childCheckedItems[1]">
            <Checkbox.Control>
              <span v-if="childCheckedItems[1]">✓</span>
            </Checkbox.Control>
            <Checkbox.Label>Child Two Checkbox</Checkbox.Label>
          </Checkbox.Root>
        </div>
      </div>
    </Variant>

    <Variant title="RenderProp">
      <Checkbox.Root v-slot="{ isChecked }">
        <Checkbox.Label>Checkbox</Checkbox.Label>
        <Checkbox.Control>
          <span v-if="isChecked">✓</span>
        </Checkbox.Control>
      </Checkbox.Root>
    </Variant>
  </Story>
</template>
