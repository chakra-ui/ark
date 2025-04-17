<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ListboxContentBaseProps extends PolymorphicProps {}
export interface ListboxContentProps
  extends ListboxContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

defineProps<ListboxContentProps>()
const listbox = useListboxContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
