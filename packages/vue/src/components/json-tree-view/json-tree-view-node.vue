<script lang="ts">
import type { JsonNode, JsonNodeHastElement } from '@zag-js/json-tree-utils'

export interface JsonTreeViewNodeBaseProps {
  indentGuide?: boolean
}

export interface JsonTreeViewNodeProps extends JsonTreeViewNodeBaseProps {
  node: JsonNode
  indexPath: number[]
}
</script>

<script setup lang="ts">
import { getAccessibleDescription, jsonNodeToElement, keyPathToKey } from '@zag-js/json-tree-utils'
import { computed, toValue } from 'vue'
import TreeViewItemText from '../tree-view/tree-view-item-text.vue'
import TreeViewItem from '../tree-view/tree-view-item.vue'
import TreeViewNodeProvider from '../tree-view/tree-view-node-provider.vue'
import TreeViewBranchContent from '../tree-view/tree-view-branch-content.vue'
import TreeViewBranchControl from '../tree-view/tree-view-branch-control.vue'
import TreeViewBranchIndentGuide from '../tree-view/tree-view-branch-indent-guide.vue'
import TreeViewBranchIndicator from '../tree-view/tree-view-branch-indicator.vue'
import TreeViewBranchText from '../tree-view/tree-view-branch-text.vue'
import TreeViewBranch from '../tree-view/tree-view-branch.vue'
import { useTreeViewContext } from '../tree-view/use-tree-view-context'
import JsonTreeViewKeyNode from './json-tree-view-key-node.vue'
import { useJsonTreeViewPropsContext } from './json-tree-view-props-context'
import JsonTreeViewValueNode from './json-tree-view-value-node.vue'

const props = defineProps<JsonTreeViewNodeProps>()

const tree = useTreeViewContext()
const nodeState = computed(() => tree.value.getNodeState({ node: props.node, indexPath: props.indexPath }))

const options = useJsonTreeViewPropsContext()

const key = computed(() => keyPathToKey(props.node.keyPath, { excludeRoot: true }))
const valueNode = computed(() => jsonNodeToElement(props.node, toValue(options)))

const nodeProps = computed(() => {
  const desc = getAccessibleDescription(props.node)

  const line = props.indexPath.reduce((acc, curr) => acc + curr, 1)
  const lineLength = props.indexPath.length - 1

  return {
    'aria-label': desc,
    'data-line': line,
    style: { ['--line-length' as any]: lineLength },
  }
})

defineSlots<{
  default(props: { node: JsonNodeHastElement }): unknown
  arrow(): unknown
  indentGuide(): unknown
}>()
</script>

<template>
  <TreeViewNodeProvider :node="node" :index-path="indexPath">
    <TreeViewBranch v-if="nodeState.isBranch" data-scope="json-tree-view">
      <TreeViewBranchControl v-bind="nodeProps" data-scope="json-tree-view">
        <TreeViewBranchIndicator v-if="$slots.arrow" data-scope="json-tree-view">
          <slot name="arrow" />
        </TreeViewBranchIndicator>
        <TreeViewBranchText data-scope="json-tree-view">
          <JsonTreeViewKeyNode v-if="key" :node="node" :show-quotes="options.quotesOnKeys" />
          <JsonTreeViewValueNode :node="valueNode">
            <template #default="{ node: childNode }">
              <slot :node="childNode" />
            </template>
          </JsonTreeViewValueNode>
        </TreeViewBranchText>
      </TreeViewBranchControl>
      <TreeViewBranchContent data-scope="json-tree-view">
        <slot v-if="$slots.indentGuide" name="indentGuide" />
        <TreeViewBranchIndentGuide v-else-if="indentGuide" />
        <JsonTreeViewNode
          v-for="(child, index) in node.children"
          :key="index"
          v-bind="$props"
          :node="child"
          :index-path="[...indexPath, index]"
        >
          <template #default="{ node: childNode }">
            <slot :node="childNode" />
          </template>
          <template #arrow>
            <slot name="arrow" />
          </template>
          <template #indentGuide>
            <slot name="indentGuide" />
          </template>
        </JsonTreeViewNode>
      </TreeViewBranchContent>
    </TreeViewBranch>
    <TreeViewItem v-else v-bind="nodeProps" data-scope="json-tree-view">
      <TreeViewItemText data-scope="json-tree-view">
        <JsonTreeViewKeyNode v-if="key" :node="node" :show-quotes="options.quotesOnKeys" />
        <JsonTreeViewValueNode :node="valueNode">
          <template #default="{ node: childNode }">
            <slot :node="childNode" />
          </template>
        </JsonTreeViewValueNode>
      </TreeViewItemText>
    </TreeViewItem>
  </TreeViewNodeProvider>
</template>
