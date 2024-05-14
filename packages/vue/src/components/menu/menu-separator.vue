<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface MenuSeparatorProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuSeparatorProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.hr v-bind="menu.separatorProps" :as-child="asChild">
    <slot />
  </ark.hr>
</template>
