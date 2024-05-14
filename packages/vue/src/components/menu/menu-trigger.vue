<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface MenuTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuTriggerProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.button v-bind="menu.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
