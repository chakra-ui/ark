<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectHiddenSelectBaseProps extends PolymorphicProps {}
export interface SelectHiddenSelectProps
  extends SelectHiddenSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectHiddenSelectProps>()
const select = useSelectContext()
</script>

<template>
  <ark.select v-bind="select.getHiddenSelectProps()">
    <option v-if="select.value.length === 0" value="" />
    <option v-for="option in select.collection.toArray()" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </ark.select>
</template>
