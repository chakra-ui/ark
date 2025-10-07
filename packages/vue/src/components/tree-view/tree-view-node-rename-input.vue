<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewNodeRenameInputBaseProps extends PolymorphicProps {}
export interface TreeViewNodeRenameInputProps
  extends TreeViewNodeRenameInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

defineProps<TreeViewNodeRenameInputProps>()
const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="treeView.getNodeRenameInputProps(nodeProps)" :as-child="asChild">
    <slot />
  </ark.input>
</template>
