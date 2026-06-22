<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, ExternalLink, File } from 'lucide-vue-next'

interface Node {
  id: string
  name: string
  href?: string
  children?: Node[]
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
        <TreeNodeWithLinks
          v-for="(child, index) in node.children"
          :key="child.id"
          :node="child"
          :index-path="[...indexPath, index]"
        />
      </TreeView.NodeGroupContent>
    </TreeView.NodeGroup>
    <TreeView.Node v-else>
      <TreeView.Cell as-child>
        <a :href="node.href">
          <TreeView.NodeText>
            <File />
            {{ node.name }}
          </TreeView.NodeText>
          <ExternalLink v-if="node.href?.startsWith('http')" :size="12" />
        </a>
      </TreeView.Cell>
    </TreeView.Node>
  </TreeView.NodeProvider>
</template>
