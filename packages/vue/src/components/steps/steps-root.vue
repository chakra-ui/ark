<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './steps.types'

export interface StepsRootBaseProps extends RootProps, PolymorphicProps {}
export interface StepsRootProps
  extends StepsRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface StepsRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSteps } from './use-steps'
import { StepsProvider } from './use-steps-context'
const props = withDefaults(defineProps<StepsRootProps>(), {
  linear: undefined,
} satisfies BooleanDefaults<RootProps>)

const steps = useSteps(props)

StepsProvider(steps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
