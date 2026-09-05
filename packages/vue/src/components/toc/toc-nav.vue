<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocNavBaseProps extends PolymorphicProps {
  placement?: 'left' | 'right'
}
export interface TocNavProps
  extends
    TocNavBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTocContext } from './use-toc-context'

defineProps<TocNavProps>()
const toc = useTocContext()

useForwardExpose()
</script>

<template>
  <ark.nav v-bind="toc.getRootProps()" :data-placement="placement" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.nav>
</template>
