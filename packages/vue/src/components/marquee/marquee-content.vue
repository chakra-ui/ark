<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useScopeId } from '../../utils/use-scope-id'
import { useMarqueeContext } from './use-marquee-context'

defineOptions({ inheritAttrs: false })
defineProps<MarqueeContentProps>()

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
  >
    <slot />
  </ark.div>
</template>
