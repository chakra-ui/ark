<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseMenubarReturn } from './use-menubar.ts'

interface RootProviderProps {
  value: UnwrapRef<UseMenubarReturn>
}

export interface MenubarRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface MenubarRootProviderProps
  extends
    MenubarRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { MenubarProvider } from './use-menubar-context.ts'

const props = defineProps<MenubarRootProviderProps>()
const menubar = computed(() => props.value)

MenubarProvider(menubar)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menubar.getRootProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
