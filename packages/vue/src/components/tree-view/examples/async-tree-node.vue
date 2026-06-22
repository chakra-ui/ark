<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, File, Folder, LoaderCircle, SquareCheckBig } from 'lucide-vue-next'

interface Node {
  id: string
  name: string
  children?: Node[]
  childrenCount?: number
}

interface Props {
  node: Node
  indexPath: number[]
}

defineProps<Props>()
</script>

<template>
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.NodeGroup v-if="node.children || node.childrenCount">
      <TreeView.Node>
        <TreeView.Cell>
          <TreeView.NodeText>
            <TreeView.NodeContext v-slot="{ loading }">
              <LoaderCircle v-if="loading" style="animation: spin 1s infinite" />
              <Folder v-else />
            </TreeView.NodeContext>
            {{ node.name }}
          </TreeView.NodeText>
          <TreeView.NodeExpandTrigger>
            <TreeView.NodeIndicator type="expanded">
              <ChevronRight />
            </TreeView.NodeIndicator>
          </TreeView.NodeExpandTrigger>
        </TreeView.Cell>
      </TreeView.Node>
      <TreeView.NodeGroupContent>
        <TreeView.IndentGuide />
        <AsyncTreeNode
          v-for="(child, index) in node.children"
          :key="child.id"
          :node="child"
          :index-path="[...indexPath, index]"
        />
      </TreeView.NodeGroupContent>
    </TreeView.NodeGroup>
    <TreeView.Node v-else>
      <TreeView.Cell>
        <TreeView.NodeIndicator type="selected">
          <SquareCheckBig />
        </TreeView.NodeIndicator>
        <TreeView.NodeText>
          <File />
          {{ node.name }}
        </TreeView.NodeText>
      </TreeView.Cell>
    </TreeView.Node>
  </TreeView.NodeProvider>
</template>
