<script lang="ts">
import type { RootEmits, RootProps } from './toggle-group.types'

export interface ToggleGroupRootProps extends RootProps, PolymorphicProps {}
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
})
const emits = defineEmits<ToggleGroupRootEmits>()

const toggleGroup = useToggleGroup(props, emits)
ToggleGroupProvider(toggleGroup)
</script>

<template>
  <ark.div v-bind="toggleGroup.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
