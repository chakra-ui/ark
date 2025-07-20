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
import { TreeView, useTreeViewContext } from '../tree-view'
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
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.Branch v-if="nodeState.isBranch" data-scope="json-tree-view">
      <TreeView.BranchControl v-bind="nodeProps" data-scope="json-tree-view">
        <TreeView.BranchIndicator v-if="$slots.arrow" data-scope="json-tree-view">
          <slot name="arrow" />
        </TreeView.BranchIndicator>
        <TreeView.BranchText data-scope="json-tree-view">
          <JsonTreeViewKeyNode v-if="key" :node="node" :show-quotes="options.quotesOnKeys" />
          <JsonTreeViewValueNode :node="valueNode">
            <template #default="{ node: childNode }">
              <slot :node="childNode" />
            </template>
          </JsonTreeViewValueNode>
        </TreeView.BranchText>
      </TreeView.BranchControl>
      <TreeView.BranchContent data-scope="json-tree-view">
        <slot v-if="$slots.indentGuide" name="indentGuide" />
        <TreeView.BranchIndentGuide v-else-if="indentGuide" />
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
      </TreeView.BranchContent>
    </TreeView.Branch>
    <TreeView.Item v-else v-bind="nodeProps" data-scope="json-tree-view">
      <TreeView.ItemText data-scope="json-tree-view">
        <JsonTreeViewKeyNode v-if="key" :node="node" :show-quotes="options.quotesOnKeys" />
        <JsonTreeViewValueNode :node="valueNode">
          <template #default="{ node: childNode }">
            <slot :node="childNode" />
          </template>
        </JsonTreeViewValueNode>
      </TreeView.ItemText>
    </TreeView.Item>
  </TreeView.NodeProvider>
</template>
