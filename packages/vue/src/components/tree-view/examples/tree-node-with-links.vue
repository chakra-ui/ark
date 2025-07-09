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
  <TreeView.NodeProvider :node="node" :indexPath="indexPath">
    <template v-if="node.children">
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchText>{{ node.name }}</TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRight />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          <TreeNodeWithLinks
            v-for="(child, index) in node.children"
            :key="child.id"
            :node="child"
            :indexPath="[...indexPath, index]"
          />
        </TreeView.BranchContent>
      </TreeView.Branch>
    </template>
    <template v-else>
      <TreeView.Item asChild>
        <a :href="node.href">
          <TreeView.ItemText>
            <File />
            {{ node.name }}
          </TreeView.ItemText>
          <ExternalLink v-if="node.href?.startsWith('http')" :size="12" />
        </a>
      </TreeView.Item>
    </template>
  </TreeView.NodeProvider>
</template>
