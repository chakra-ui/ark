<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type CheckedState } from '../'

const checked = ref<CheckedState>(false)
</script>

<template>
  <Fragment>
    <button @click="() => (checked = true)">set checked</button>
    <Checkbox.Root :checked="checked">
      <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control data-testid="control" />
      <Checkbox.Indicator />
    </Checkbox.Root>
  </Fragment>
</template>
