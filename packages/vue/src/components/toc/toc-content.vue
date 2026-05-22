<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocContentBaseProps extends PolymorphicProps {}
export interface TocContentProps
  extends
    TocContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<TocContentProps>()

useForwardExpose()
</script>

<template>
  <ark.article :as-child="asChild">
    <slot />
  </ark.article>
</template>
