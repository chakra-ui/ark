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
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from '../field'
import { useSelectContext } from './use-select-context'

defineProps<SelectHiddenSelectProps>()

const select = useSelectContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.select :aria-describedby="field?.ariaDescribedby" v-bind="select.getHiddenSelectProps()">
    <option v-if="select.value.length === 0" value="" />
    <option
      v-for="item in select.collection.items"
      :key="item.value"
      :value="select.collection.getItemValue(item)"
      :disabled="select.collection.getItemDisabled(item)"
    />
  </ark.select>
</template>
