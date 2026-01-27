<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuPositionerBaseProps extends PolymorphicProps {}
export interface MenuPositionerProps
  extends
    MenuPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

defineProps<MenuPositionerProps>()

const menu = useMenuContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="menu.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
