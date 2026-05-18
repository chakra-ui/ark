<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NavigationMenuItemIndicatorBaseProps extends PolymorphicProps {}
export interface NavigationMenuItemIndicatorProps
  extends
    NavigationMenuItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed, useAttrs } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'

defineProps<NavigationMenuItemIndicatorProps>()
const attrs = useAttrs()

const api = useNavigationMenuContext()
const itemProps = useNavigationMenuItemPropsContext()

const mergedProps = computed(() => mergeProps({ ...attrs }, api.value.getItemIndicatorProps(itemProps?.value)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
