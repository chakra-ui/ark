<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxStatusBaseProps extends PolymorphicProps {}
export interface ComboboxStatusProps
  extends
    ComboboxStatusBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { comboboxAnatomy } from './combobox.anatomy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const parts = comboboxAnatomy.build()

defineProps<ComboboxStatusProps>()

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
