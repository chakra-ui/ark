<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface MenuContentBaseProps extends PolymorphicProps {}
export interface MenuContentProps
  extends MenuContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuContentProps>()
const menu = useMenuContext()
const presence = usePresenceContext()
const mergedProps = computed(() => mergeProps(menu.value.getContentProps(), presence.value.presenceProps))
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>