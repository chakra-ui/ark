<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, SquareCheckBig, SquareMinus } from 'lucide-vue-next'

interface Node {
  id: string
  name: string
  children?: Node[] | undefined
}

interface Props {
  node: Node
  indexPath: number[]
}

defineProps<Props>()
</script>

<template>
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.NodeGroup v-if="node.children">
      <TreeView.Node>
        <TreeView.Cell>
          <TreeView.NodeCheckbox>
            <TreeView.NodeIndicator type="checked">
              <SquareCheckBig />
            </TreeView.NodeIndicator>
            <TreeView.NodeIndicator type="indeterminate">
              <SquareMinus />
            </TreeView.NodeIndicator>
          </TreeView.NodeCheckbox>
          <TreeView.NodeText>{{ node.name }}</TreeView.NodeText>
          <TreeView.NodeExpandTrigger>
            <TreeView.NodeIndicator type="expanded">
              <ChevronRight />
            </TreeView.NodeIndicator>
          </TreeView.NodeExpandTrigger>
        </TreeView.Cell>
      </TreeView.Node>
      <TreeView.NodeGroupContent>
        <TreeView.IndentGuide />
        <TreeNodeWithCheckbox
          v-for="(child, childIndex) in node.children"
          :key="child.id"
          :node="child"
          :index-path="[...indexPath, childIndex]"
        />
      </TreeView.NodeGroupContent>
    </TreeView.NodeGroup>
    <TreeView.Node v-else>
      <TreeView.Cell>
        <TreeView.NodeCheckbox>
          <TreeView.NodeIndicator type="checked">
            <SquareCheckBig />
          </TreeView.NodeIndicator>
          <TreeView.NodeIndicator type="indeterminate">
            <SquareMinus />
          </TreeView.NodeIndicator>
        </TreeView.NodeCheckbox>
        <TreeView.NodeText>{{ node.name }}</TreeView.NodeText>
      </TreeView.Cell>
    </TreeView.Node>
  </TreeView.NodeProvider>
</template>
