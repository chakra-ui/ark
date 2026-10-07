<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseMeterReturn } from './use-meter.ts'

interface RootProviderProps {
  value: UnwrapRef<UseMeterReturn>
}

export interface MeterRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface MeterRootProviderProps
  extends
    MeterRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { MeterProvider } from './use-meter-context.ts'

const props = defineProps<MeterRootProviderProps>()
const meter = computed(() => props.value)

MeterProvider(meter)
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
