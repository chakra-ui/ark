<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxStatusBaseProps extends PolymorphicProps {}
export interface ListboxStatusProps
  extends
    ListboxStatusBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { listboxAnatomy } from './listbox.anatomy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const parts = listboxAnatomy.build()

defineProps<ListboxStatusProps>()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="parts.status.attrs('')" role="status" aria-live="polite" aria-atomic="true" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
