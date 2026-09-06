<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListVirtualizerContentBaseProps extends PolymorphicProps {}
export interface ListVirtualizerContentProps
  extends
    ListVirtualizerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

defineProps<ListVirtualizerContentProps>()
const virtualizer = useListVirtualizerContext()

useForwardExpose()

const contentProps = computed(() => ({ style: virtualizer.value.getContentStyle() }))
</script>

<template>
  <ark.div v-bind="contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
