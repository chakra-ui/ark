<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps {}
export interface DrawerSwipeAreaProps
  extends
    DrawerSwipeAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils'

defineProps<DrawerSwipeAreaProps>()

useForwardExpose()
</script>

<template>
  <ark.div :as-child="asChild">
    <slot />
  </ark.div>
</template>
