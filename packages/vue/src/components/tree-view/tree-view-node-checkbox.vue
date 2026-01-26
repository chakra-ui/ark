<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewNodeCheckboxBaseProps extends PolymorphicProps {}
export interface TreeViewNodeCheckboxProps
  extends
    TreeViewNodeCheckboxBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

defineProps<TreeViewNodeCheckboxProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="treeView.getNodeCheckboxProps(nodeProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
