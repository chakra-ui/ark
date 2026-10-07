<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MeterLabelBaseProps extends PolymorphicProps {}
export interface MeterLabelProps
  extends
    MeterLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useMeterContext } from './use-meter-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MeterLabelProps>()
const meter = useMeterContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="meter.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
