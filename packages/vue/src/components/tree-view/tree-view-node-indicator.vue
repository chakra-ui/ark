<script lang="ts">
import type { NodeIndicatorType } from '@zag-js/tree-view'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewNodeIndicatorBaseProps extends PolymorphicProps {
  /**
   * The type of indicator
   * - "expanded": always visible, reflects open/closed state
   * - "selected": shown when the node is selected
   * - "checked": shown when the node is checked
   * - "indeterminate": shown when the node is indeterminate (partially checked)
   */
  type: NodeIndicatorType
}
export interface TreeViewNodeIndicatorProps
  extends
    TreeViewNodeIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

const props = defineProps<TreeViewNodeIndicatorProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

const indicatorProps = computed(() => treeView.value.getNodeIndicatorProps({ ...nodeProps, type: props.type }))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="indicatorProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
