<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface ComboboxContentBaseProps extends PolymorphicProps {}
export interface ComboboxContentProps
  extends ComboboxContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useForwardExpose } from '../../utils'

defineProps<ComboboxContentProps>()
const combobox = useComboboxContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(combobox.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
