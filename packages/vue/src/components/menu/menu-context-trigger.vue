<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuContextTriggerProps
  extends PolymorphicProps,
    /* @vue-ignore */ ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuContextTriggerProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.button v-bind="menu.contextTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
