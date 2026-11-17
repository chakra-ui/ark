<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TocContentProps>()

useForwardExpose()
</script>

<template>
  <ark.article :as-child="asChild">
    <slot />
  </ark.article>
</template>
