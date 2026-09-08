<script lang="ts">
import type { ContentState } from '@zag-js/menu'
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface MenuContentState extends ContentState {}
export interface MenuContentBaseProps extends PolymorphicProps {}
export interface MenuContentProps
  extends
    MenuContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MenuContentProps>()

defineSlots<PolymorphicSlots<MenuContentState>>()

const menu = useMenuContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(menu.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="menu.getContentState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
