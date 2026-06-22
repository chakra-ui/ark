<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewIndentGuideBaseProps extends PolymorphicProps {}
export interface TreeViewIndentGuideProps
  extends
    TreeViewIndentGuideBaseProps,
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

defineProps<TreeViewIndentGuideProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getIndentGuideProps(nodeProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
