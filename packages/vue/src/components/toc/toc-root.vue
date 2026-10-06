<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './toc.types'

export interface TocRootBaseProps extends RootProps, PolymorphicProps {}
export interface TocRootProps
  extends
    TocRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TocRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useToc } from './use-toc'
import { TocProvider } from './use-toc-context'

const props = withDefaults(defineProps<TocRootProps>(), {
  autoScroll: undefined,
})
const emits = defineEmits<TocRootEmits>()

const toc = useToc(props, emits)
TocProvider(toc)

const rootProps = computed(() => {
  const { id, 'aria-labelledby': ariaLabelledby, ...rest } = toc.value.getRootProps()
  return rest
})

useForwardExpose()
</script>

<template>
  <ark.div v-bind="rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
