<script lang="ts">
import type { ItemProps } from '@zag-js/steps'
import type { LiHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsItemBaseProps extends ItemProps, PolymorphicProps {}
export interface StepsItemProps
  extends StepsItemBaseProps,
    /**
     * @vue-ignore
     */
    LiHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { StepsItemPropsProvider } from './use-steps-item-props-context'

const props = defineProps<StepsItemProps>()
const steps = useStepsContext()
StepsItemPropsProvider(props)
</script>

<template>
  <ark.li v-bind="steps.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.li>
</template>
