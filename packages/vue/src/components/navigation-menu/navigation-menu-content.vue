<script lang="ts">
import type { ContentProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuContentBaseProps extends Partial<ContentProps>, PolymorphicProps {}
export interface NavigationMenuContentProps
  extends NavigationMenuContentBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'onSelect'> {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed, useAttrs } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { usePresence } from '../presence'
import { ark } from '../factory'

const props = defineProps<NavigationMenuContentProps>()
const attrs = useAttrs()

const api = useNavigationMenuContext()
const itemContext = useNavigationMenuItemPropsContext()
const renderStrategy = useRenderStrategyProps()

const value = computed(() => props.value ?? itemContext?.value.value)

const contentProps = computed(() => ({ ...props, value: value.value }))

const presence = usePresence(computed(() => ({ ...renderStrategy.value, present: api.value.value === value.value })))

const mergedProps = computed(() =>
  mergeProps({ ...attrs }, api.value.getContentProps(contentProps.value), presence.value.presenceProps),
)

const viewportNode = computed(() => api.value.getViewportNode())
const isViewportRendered = computed(() => api.value.isViewportRendered)

useForwardExpose()
</script>

<template>
  <template v-if="isViewportRendered && viewportNode">
    <div v-bind="api.getViewportProxyProps(contentProps)" />
    <div v-bind="api.getTriggerProxyProps(contentProps)" />
    <Teleport :to="viewportNode">
      <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
        <slot />
      </ark.div>
    </Teleport>
  </template>
  <ark.div v-else-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
