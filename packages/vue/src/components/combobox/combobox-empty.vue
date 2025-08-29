<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxEmptyBaseProps extends PolymorphicProps {}
export interface ComboboxEmptyProps
  extends ComboboxEmptyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { comboboxAnatomy } from './combobox.anatomy'
import { useComboboxContext } from './use-combobox-context'
import { useForwardExpose } from '../../utils'

const parts = comboboxAnatomy.build()

defineProps<ComboboxEmptyProps>()
const combobox = useComboboxContext()
const isEmpty = computed(() => combobox.value.collection.size === 0)

useForwardExpose()
</script>

<template>
  <ark.div v-if="isEmpty" v-bind="parts.empty.attrs" role="presentation" :as-child="asChild">
    <slot />
  </ark.div>
</template>
