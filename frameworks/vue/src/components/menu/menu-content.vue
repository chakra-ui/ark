<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface MenuContentProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuContentProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.div v-bind="menu.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
