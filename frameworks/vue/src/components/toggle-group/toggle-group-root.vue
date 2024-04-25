<script lang="ts">
import type { RootEmits, RootProps } from './toggle-group.types'

export interface ToggleGroupRootProps extends RootProps, PolimoprhicProps {}
export interface ToggleGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolimoprhicProps } from '../factory'
import { useToggleGroup } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

const props = withDefaults(defineProps<ToggleGroupRootProps>(), {
  loopFocus: true,
  rovingFocus: true,
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
