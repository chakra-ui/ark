<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxEmptyBaseProps extends PolymorphicProps {}
export interface ListboxEmptyProps
  extends
    ListboxEmptyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { listboxAnatomy } from './listbox.anatomy.ts'
import { useListboxContext } from './use-listbox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const parts = listboxAnatomy.build()

defineProps<ListboxEmptyProps>()
const listbox = useListboxContext()
const isEmpty = computed(() => listbox.value.collection.size === 0)

useForwardExpose()
</script>

<template>
  <ark.div v-if="isEmpty" v-bind="parts.empty.attrs" role="presentation" :as-child="asChild">
    <slot />
  </ark.div>
</template>
