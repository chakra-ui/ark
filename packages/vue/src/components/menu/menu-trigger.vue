<script lang="ts">
import type { TriggerProps, TriggerState } from '@zag-js/menu'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface MenuTriggerState extends TriggerState {}
export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface MenuTriggerProps
  extends
    MenuTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<MenuTriggerProps>()

defineSlots<PolymorphicSlots<MenuTriggerState>>()
const menu = useMenuContext()
const presence = usePresenceContext()

const triggerProps = computed(() => {
  const localProps = menu.value.getTriggerProps(props)
  return {
    ...localProps,
    'aria-controls': presence.value.unmounted ? undefined : localProps['aria-controls'],
  }
})

useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :state="menu.getTriggerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
