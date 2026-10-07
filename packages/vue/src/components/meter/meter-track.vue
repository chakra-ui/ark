<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MeterTrackBaseProps extends PolymorphicProps {}
export interface MeterTrackProps
  extends
    MeterTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useMeterContext } from './use-meter-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MeterTrackProps>()
const meter = useMeterContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="meter.getTrackProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
