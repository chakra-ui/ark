<script lang="ts">
import type { ContentState } from '@zag-js/marquee'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface MarqueeContentState extends ContentState {}
export interface MarqueeContentBaseProps extends PolymorphicProps {}
export interface MarqueeContentProps
  extends
    MarqueeContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useAttrs } from 'vue'
import { ark } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useScopeId } from '../../utils/use-scope-id.ts'
import { useMarqueeContext } from './use-marquee-context.ts'

defineOptions({ inheritAttrs: false })
defineProps<MarqueeContentProps>()

defineSlots<PolymorphicSlots<MarqueeContentState>>()

const marquee = useMarqueeContext()
const attrs = useAttrs()
const scopeId = useScopeId()

useForwardExpose()
</script>

<template>
  <ark.div
    v-for="(_, index) in Array.from({ length: marquee.contentCount })"
    :key="index"
    v-bind="{
      ...attrs,
      ...(scopeId ? { [scopeId]: '' } : {}),
      ...marquee.getContentProps({ index }),
    }"
    :as-child="asChild"
    :state="marquee.getContentState({ index })"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
