<script lang="ts">
import type { ContentProps, ContentState } from '@zag-js/drawer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DrawerContentState extends ContentState {}
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
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'
import { usePresenceContext } from '../presence/index.ts'
import { mergeProps } from '@zag-js/vue'
import { createSplitProps } from '../create-split-props.ts'

const props = withDefaults(defineProps<DrawerContentProps>(), {
  draggable: true,
})

defineSlots<PolymorphicSlots<DrawerContentState>>()

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
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="drawer.getContentState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
