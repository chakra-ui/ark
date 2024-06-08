<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectClearTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectClearTriggerProps>()
const select = useSelectContext()
</script>

<template>
  <ark.button v-bind="select.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
