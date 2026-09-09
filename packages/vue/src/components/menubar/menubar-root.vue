<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootProps } from './menubar.types.ts'

export interface MenubarRootBaseProps extends RootProps, PolymorphicProps {}
export interface MenubarRootProps
  extends
    MenubarRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useMenubar } from './use-menubar.ts'
import { MenubarProvider } from './use-menubar-context.ts'

const props = withDefaults(defineProps<MenubarRootProps>(), {
  disabled: undefined,
  loopFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const menubar = useMenubar(props)
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
