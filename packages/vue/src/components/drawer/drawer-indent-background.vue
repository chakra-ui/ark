<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useDrawerStackContext } from './use-drawer-stack-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerIndentBackgroundProps>()

const stackApi = useDrawerStackContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="stackApi.getIndentBackgroundProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
