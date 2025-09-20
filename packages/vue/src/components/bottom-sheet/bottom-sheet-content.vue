<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { ContentProps } from '@zag-js/bottom-sheet'

export interface BottomSheetContentBaseProps extends PolymorphicProps, ContentProps {}
export interface BottomSheetContentProps
  extends BottomSheetContentBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'draggable'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils'
import { usePresenceContext } from '../presence'
import { mergeProps } from '@zag-js/vue'
import { createSplitProps } from '../create-split-props'

const props = withDefaults(defineProps<BottomSheetContentProps>(), {
  draggable: true,
})

const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['draggable'])
const bottomSheet = useBottomSheetContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(
    bottomSheet.value.getContentProps({ draggable: true, ...contentProps }),
    presence.value.presenceProps,
    localProps,
  ),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
