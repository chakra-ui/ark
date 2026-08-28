<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './toggle-group.types.ts'

export interface ToggleGroupRootBaseProps extends RootProps, PolymorphicProps {}
export interface ToggleGroupRootProps
  extends
    ToggleGroupRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ToggleGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useToggleGroup } from './use-toggle-group.ts'
import { ToggleGroupProvider } from './use-toggle-group-context.ts'

const props = withDefaults(defineProps<ToggleGroupRootProps>(), {
  disabled: undefined,
  deselectable: undefined,
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
