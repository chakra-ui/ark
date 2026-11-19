<script lang="ts">
import type { TriggerProps, TriggerState } from '@zag-js/drawer'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DrawerTriggerState extends TriggerState {}
export interface DrawerTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DrawerTriggerProps
  extends
    DrawerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

const props = defineProps<DrawerTriggerProps>()

defineSlots<PolymorphicSlots<DrawerTriggerState>>()

const drawer = useDrawerContext()
const presence = usePresenceContext()

const triggerProps = computed(() => {
  const localProps = drawer.value.getTriggerProps(props)
  return {
    ...localProps,
    'aria-controls': presence.value.unmounted ? undefined : localProps['aria-controls'],
  }
})
useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :state="drawer.getTriggerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
