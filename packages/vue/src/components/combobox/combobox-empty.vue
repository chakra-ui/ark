<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxEmptyBaseProps extends PolymorphicProps {}
export interface ComboboxEmptyProps
  extends
    ComboboxEmptyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { comboboxAnatomy } from './combobox.anatomy.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const parts = comboboxAnatomy.build()

defineProps<ComboboxEmptyProps>()
const combobox = useComboboxContext()
const isEmpty = computed(() => combobox.value.collection.size === 0)

useForwardExpose()
</script>

<template>
  <!-- stays mounted so the live region is already known to screen readers
       when the message appears; only the children are conditional -->
  <ark.div v-bind="parts.empty.attrs('')" role="status" aria-live="polite" aria-atomic="true" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot v-if="isEmpty" />
    </template>
  </ark.div>
</template>
