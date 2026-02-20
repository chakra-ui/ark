<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerIndentBackgroundBaseProps extends PolymorphicProps {}
export interface DrawerIndentBackgroundProps
  extends
    DrawerIndentBackgroundBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDrawerStackContext } from './use-drawer-stack-context'
import { useForwardExpose } from '../../utils'

defineProps<DrawerIndentBackgroundProps>()

const stackApi = useDrawerStackContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="stackApi.getIndentBackgroundProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
