<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/steps'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface StepsItemState extends ItemState {}
export interface StepsItemBaseProps extends ItemProps, PolymorphicProps {}
export interface StepsItemProps
  extends
    StepsItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { StepsItemProvider } from './use-steps-item-context.ts'
import { StepsItemPropsProvider } from './use-steps-item-props-context.ts'

const props = defineProps<StepsItemProps>()

defineSlots<PolymorphicSlots<StepsItemState>>()
const steps = useStepsContext()
const itemState = computed(() => steps.value.getItemState(props))

StepsItemPropsProvider(props)
StepsItemProvider(itemState)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getItemProps(props)" :state="steps.getItemState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
