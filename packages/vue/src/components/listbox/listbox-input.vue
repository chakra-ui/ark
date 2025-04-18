<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ListboxInputBaseProps extends PolymorphicProps {}
export interface ListboxInputProps
  extends ListboxInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

defineProps<ListboxInputProps>()
const listbox = useListboxContext()
useForwardExpose()
</script>

<template>
  <ark.input v-bind="listbox.getInputProps()" :as-child="asChild">
    <slot />
  </ark.input>
</template>
