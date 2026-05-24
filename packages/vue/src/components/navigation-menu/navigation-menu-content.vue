<script lang="ts">
import type { ContentProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NavigationMenuContentBaseProps extends Partial<ContentProps>, PolymorphicProps {}
export interface NavigationMenuContentProps
  extends
    NavigationMenuContentBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'onSelect'> {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed, useAttrs } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'
import { usePresence } from '../presence/index.ts'
import { ark } from '../factory.ts'

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
