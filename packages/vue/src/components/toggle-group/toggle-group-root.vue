<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './toggle-group.types'

export interface ToggleGroupRootBaseProps extends RootProps, PolymorphicProps {}
export interface ToggleGroupRootProps
  extends ToggleGroupRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ToggleGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { ark } from '../factory'
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
  <ark.div v-bind="toggleGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
