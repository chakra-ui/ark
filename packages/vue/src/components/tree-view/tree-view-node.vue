<script lang="ts">
import type { NodeState } from '@zag-js/tree-view'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface TreeViewNodeState extends NodeState {}
export interface TreeViewNodeBaseProps extends PolymorphicProps {}
export interface TreeViewNodeProps
  extends
    TreeViewNodeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

defineProps<TreeViewNodeProps>()

defineSlots<PolymorphicSlots<TreeViewNodeState>>()
const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getNodeProps(nodeProps)" :state="treeView.getNodeState(nodeProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
