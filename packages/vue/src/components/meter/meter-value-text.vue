<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface MeterValueTextBaseProps extends PolymorphicProps {}
export interface MeterValueTextProps
  extends
    MeterValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useMeterContext } from './use-meter-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MeterValueTextProps>()
const meter = useMeterContext()
const slots = defineSlots<PolymorphicSlots>()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="meter.getValueTextProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>{{ slots.default?.() || meter.valueAsString }}</slot>
    </template>
  </ark.span>
</template>
