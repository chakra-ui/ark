<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { CheckSquare, ChevronRight, File, Folder, Loader2 } from 'lucide-vue-next'

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
  <TreeView.NodeProvider :node="node" :indexPath="indexPath">
    <template v-if="node.children || node.childrenCount">
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchText>
            <TreeView.NodeContext v-slot="{ loading }">
              <Loader2 v-if="loading" style="animation: spin 1s infinite" />
              <Folder v-else />
            </TreeView.NodeContext>
            {{ node.name }}
          </TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRight />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          <AsyncTreeNode
            v-for="(child, index) in node.children"
            :key="child.id"
            :node="child"
            :indexPath="[...indexPath, index]"
          />
        </TreeView.BranchContent>
      </TreeView.Branch>
    </template>
    <template v-else>
      <TreeView.Item>
        <TreeView.ItemIndicator>
          <CheckSquare />
        </TreeView.ItemIndicator>
        <TreeView.ItemText>
          <File />
          {{ node.name }}
        </TreeView.ItemText>
      </TreeView.Item>
    </template>
  </TreeView.NodeProvider>
</template>
