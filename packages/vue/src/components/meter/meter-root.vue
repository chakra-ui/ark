<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './meter.types.ts'

export interface MeterRootBaseProps extends RootProps, PolymorphicProps {}
export interface MeterRootProps
  extends
    MeterRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface MeterRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useMeter } from './use-meter.ts'
import { MeterProvider } from './use-meter-context.ts'

const props = defineProps<MeterRootProps>()
const emits = defineEmits<MeterRootEmits>()
const meter = useMeter(props, emits)

MeterProvider(meter)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="meter.getRootProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
