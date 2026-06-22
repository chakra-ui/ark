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
import TreeViewNodeText from '../tree-view/tree-view-node-text.vue'
import TreeViewNode from '../tree-view/tree-view-node.vue'
import TreeViewNodeProvider from '../tree-view/tree-view-node-provider.vue'
import TreeViewNodeGroupContent from '../tree-view/tree-view-node-group-content.vue'
import TreeViewCell from '../tree-view/tree-view-cell.vue'
import TreeViewIndentGuide from '../tree-view/tree-view-indent-guide.vue'
import TreeViewNodeIndicator from '../tree-view/tree-view-node-indicator.vue'
import TreeViewNodeGroup from '../tree-view/tree-view-node-group.vue'
import { useTreeViewContext } from '../tree-view/use-tree-view-context.ts'
import JsonTreeViewKeyNode from './json-tree-view-key-node.vue'
import { useJsonTreeViewPropsContext } from './json-tree-view-props-context.ts'
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
  arrow?(): unknown
  indentGuide?(): unknown
  renderValue?(props: { node: JsonNodeHastElement }): unknown
}>()
</script>

<template>
  <TreeViewNodeProvider :node="node" :index-path="indexPath">
    <TreeViewNodeGroup v-if="nodeState.isBranch" data-scope="json-tree-view">
      <TreeViewNode v-bind="nodeProps" data-scope="json-tree-view">
        <TreeViewCell data-scope="json-tree-view">
          <TreeViewNodeIndicator v-if="$slots.arrow" type="expanded" data-scope="json-tree-view">
            <slot name="arrow" />
          </TreeViewNodeIndicator>
          <TreeViewNodeText data-scope="json-tree-view">
            <JsonTreeViewKeyNode v-if="key" :node="node" :show-quotes="options.quotesOnKeys" />
            <JsonTreeViewValueNode :node="valueNode">
              <template #renderValue="{ node: childNode }">
                <slot name="renderValue" :node="childNode" />
              </template>
            </JsonTreeViewValueNode>
          </TreeViewNodeText>
        </TreeViewCell>
      </TreeViewNode>
      <TreeViewNodeGroupContent data-scope="json-tree-view">
        <slot v-if="$slots.indentGuide" name="indentGuide" />
        <TreeViewIndentGuide v-else-if="indentGuide" />
        <JsonTreeViewNode
          v-for="(child, index) in node.children"
          :key="index"
          v-bind="$props"
          :node="child"
          :index-path="[...indexPath, index]"
        >
          <template #arrow>
            <slot name="arrow" />
          </template>
          <template #indentGuide>
            <slot name="indentGuide" />
          </template>
          <template #renderValue="{ node: childNode }">
            <slot name="renderValue" :node="childNode" />
          </template>
        </JsonTreeViewNode>
      </TreeViewNodeGroupContent>
    </TreeViewNodeGroup>
    <TreeViewNode v-else v-bind="nodeProps" data-scope="json-tree-view">
      <TreeViewCell data-scope="json-tree-view">
        <TreeViewNodeText data-scope="json-tree-view">
          <JsonTreeViewKeyNode v-if="key" :node="node" :show-quotes="options.quotesOnKeys" />
          <JsonTreeViewValueNode :node="valueNode">
            <template #renderValue="{ node: childNode }">
              <slot name="renderValue" :node="childNode" />
            </template>
          </JsonTreeViewValueNode>
        </TreeViewNodeText>
      </TreeViewCell>
    </TreeViewNode>
  </TreeViewNodeProvider>
</template>
