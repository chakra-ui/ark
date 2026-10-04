<script lang="ts">
import type { AnchorHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocLinkBaseProps extends PolymorphicProps {}
export interface TocLinkProps
  extends
    TocLinkBaseProps,
    /**
     * @vue-ignore
     */
    AnchorHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTocContext } from './use-toc-context'
import { useTocItemPropsContext } from './use-toc-item-props-context'

defineProps<TocLinkProps>()
const toc = useTocContext()
const itemProps = useTocItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.a v-bind="toc.getLinkProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.a>
</template>
