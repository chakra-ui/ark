<script lang="ts">
import type { RootState } from '@zag-js/toggle-group'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './toggle-group.types.ts'

export interface ToggleGroupRootState extends RootState {}
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

defineSlots<PolymorphicSlots<ToggleGroupRootState>>()

const emits = defineEmits<ToggleGroupRootEmits>()

const toggleGroup = useToggleGroup(props, emits)
ToggleGroupProvider(toggleGroup)
</script>

<template>
  <ark.div v-bind="toggleGroup.getRootProps()" :state="toggleGroup.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
