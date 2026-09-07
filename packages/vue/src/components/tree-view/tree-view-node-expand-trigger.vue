<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewNodeExpandTriggerBaseProps extends PolymorphicProps {}
export interface TreeViewNodeExpandTriggerProps
  extends
    TreeViewNodeExpandTriggerBaseProps,
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

defineProps<TreeViewNodeExpandTriggerProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getNodeExpandTriggerProps(nodeProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
