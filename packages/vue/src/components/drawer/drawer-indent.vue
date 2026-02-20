<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerIndentBaseProps extends PolymorphicProps {}
export interface DrawerIndentProps
  extends
    DrawerIndentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDrawerStackContext } from './use-drawer-stack-context'
import { useForwardExpose } from '../../utils'

defineProps<DrawerIndentProps>()

const stackApi = useDrawerStackContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="stackApi.getIndentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
