<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import type { PolymorphicProps } from '../factory'
import { useToggleContext } from './use-toggle-context'

export interface ToggleIndicatorBaseProps extends PolymorphicProps {}
export interface ToggleIndicatorProps
  extends ToggleIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

defineProps<ToggleIndicatorProps>()
const toggle = useToggleContext()

const fallback = computed(() => !toggle.value.pressed)

useForwardExpose()
</script>

<template>
  <ark.span v-bind="toggle.getIndicatorProps()" :as-child="asChild">
    <slot v-if="!fallback" />
    <slot v-else name="fallback" />
  </ark.span>
</template>
