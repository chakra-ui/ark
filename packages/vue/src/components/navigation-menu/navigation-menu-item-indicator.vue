<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuItemIndicatorBaseProps extends PolymorphicProps {}
export interface NavigationMenuItemIndicatorProps
  extends NavigationMenuItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed, useAttrs } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

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
