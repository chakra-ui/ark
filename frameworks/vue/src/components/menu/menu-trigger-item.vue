<script lang="ts">
import type { PolymorphicProps } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

export interface MenuTriggerItemProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory';

defineProps<MenuTriggerItemProps>()
const triggerItemProps = useMenuTriggerItemContext()
</script>

<template>
  <ark.div v-bind="triggerItemProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
