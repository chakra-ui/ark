<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectContentBaseProps extends PolymorphicProps {}
export interface CascadeSelectContentProps
  extends
    CascadeSelectContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useCascadeSelectContext } from './use-cascade-select-context'

defineProps<CascadeSelectContentProps>()
const cascadeSelect = useCascadeSelectContext()
const presence = usePresenceContext()
const mergedContentProps = computed(() =>
  mergeProps(cascadeSelect.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedContentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
