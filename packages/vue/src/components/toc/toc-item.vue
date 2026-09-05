<script lang="ts">
import type { ItemProps } from '@zag-js/toc'
import type { LiHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TocItemProps
  extends
    TocItemBaseProps,
    /**
     * @vue-ignore
     */
    LiHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTocContext } from './use-toc-context'
import { TocItemPropsProvider } from './use-toc-item-props-context'

const props = defineProps<TocItemBaseProps>()
const toc = useTocContext()

const itemProps = computed(() => ({ item: props.item }))
TocItemPropsProvider(itemProps)

useForwardExpose()
</script>

<template>
  <ark.li v-bind="toc.getItemProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.li>
</template>
