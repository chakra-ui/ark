<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface SelectContentBaseProps extends PolymorphicProps {}
export interface SelectContentProps
  extends SelectContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
defineProps<SelectContentProps>()
const select = useSelectContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(select.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
