<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerDescriptionBaseProps extends PolymorphicProps {}
export interface DrawerDescriptionProps
  extends
    DrawerDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils'

defineProps<DrawerDescriptionProps>()

useForwardExpose()
</script>

<template>
  <ark.div :as-child="asChild">
    <slot />
  </ark.div>
</template>
