<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Assign } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { TreeNode as CascadeSelectNode } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './cascade-select.types'

export interface CascadeSelectRootBaseProps<T extends CascadeSelectNode>
  extends RootProps<T>, RenderStrategyProps, PolymorphicProps {}
export interface CascadeSelectRootProps<T extends CascadeSelectNode>
  extends
    CascadeSelectRootBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type CascadeSelectRootComponentProps<T extends CascadeSelectNode = CascadeSelectNode, P = {}> = Assign<
  CascadeSelectRootProps<T>,
  P
>

export type CascadeSelectRootComponent<P = {}> = <T extends CascadeSelectNode>(
  props: CascadeSelectRootComponentProps<T, P>,
) => any

export type { RootEmits as CascadeSelectRootEmits } from './cascade-select.types'
</script>

<script setup lang="ts" generic="T extends CascadeSelectNode">
import { computed } from 'vue'
import type { BooleanDefaults } from '../../types'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useCascadeSelect } from './use-cascade-select'
import { CascadeSelectProvider } from './use-cascade-select-context'

const props = withDefaults(defineProps<CascadeSelectRootProps<T>>(), {
  allowParentSelection: undefined,
  closeOnSelect: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  invalid: undefined,
  loopFocus: undefined,
  multiple: undefined,
  open: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps<T>>)

const emits = defineEmits<RootEmits>()

const cascadeSelect = useCascadeSelect<T>(props, emits)

const presence = usePresence(
  computed(() => ({
    present: cascadeSelect.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  emits,
)

CascadeSelectProvider(cascadeSelect)
PresenceProvider(presence)

RenderStrategyPropsProvider(
  computed(() => ({
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="cascadeSelect.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
