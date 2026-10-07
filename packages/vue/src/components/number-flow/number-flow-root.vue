<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './number-flow.types.ts'

export interface NumberFlowRootBaseProps extends RootProps, PolymorphicProps {}
export interface NumberFlowRootProps
  extends
    NumberFlowRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface NumberFlowRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberFlow } from './use-number-flow.ts'
import { NumberFlowProvider } from './use-number-flow-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<NumberFlowRootProps>(), {
  continuous: undefined,
  trend: undefined,
  respectMotionPreference: undefined,
  live: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<NumberFlowRootEmits>()

const numberFlow = useNumberFlow(props, emits)
NumberFlowProvider(numberFlow)

useForwardExpose()
</script>

<template>
  <ark.span v-bind="numberFlow.getRootProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
