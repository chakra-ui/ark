<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectHiddenSelectProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory';
import { useSelectContext } from './use-select-context';

defineProps<SelectHiddenSelectProps>()
const select = useSelectContext()
</script>

<template>
  <ark.select v-bind="select.hiddenSelectProps">
    <option v-if="select.value.length === 0" value="" />
    <option v-for="option in select.collection.toArray()" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </ark.select>
</template>
