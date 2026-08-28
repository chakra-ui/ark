<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './steps.types.ts'

export interface StepsRootBaseProps extends RootProps, PolymorphicProps {}
export interface StepsRootProps
  extends
    StepsRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface StepsRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSteps } from './use-steps.ts'
import { StepsProvider } from './use-steps-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<StepsRootProps>(), {
  linear: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<StepsRootEmits>()

const steps = useSteps(props, emits)

StepsProvider(steps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
