<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './toggle-group.types'

export interface ToggleGroupRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ToggleGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useToggleGroup } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

const props = withDefaults(defineProps<ToggleGroupRootProps>(), {
  disabled: undefined,
  loopFocus: undefined,
  multiple: undefined,
  rovingFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<ToggleGroupRootEmits>()

const toggleGroup = useToggleGroup(props, emits)
ToggleGroupProvider(toggleGroup)
</script>

<template>
  <ark.div v-bind="toggleGroup.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
