<script setup lang="ts">
import { DateInput, type DateInputRootProps } from '..'

const props = defineProps<DateInputRootProps>()
</script>

<template>
  <DateInput.Root v-bind="props" selectionMode="range">
    <DateInput.HiddenInput :index="0" />
    <DateInput.HiddenInput :index="1" />
  </DateInput.Root>
</template>
