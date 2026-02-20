<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { ContentProps } from '@zag-js/drawer'

export interface DrawerContentBaseProps extends PolymorphicProps, ContentProps {}
export interface DrawerContentProps
  extends
    DrawerContentBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'draggable'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { useForwardExpose } from '../../utils'
import { usePresenceContext } from '../presence'
import { mergeProps } from '@zag-js/vue'
import { createSplitProps } from '../create-split-props'

const props = withDefaults(defineProps<DrawerContentProps>(), {
  draggable: true,
})

const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['draggable'])
const drawer = useDrawerContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(
    drawer.value.getContentProps({ draggable: true, ...contentProps }),
    presence.value.presenceProps,
    localProps,
  ),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
