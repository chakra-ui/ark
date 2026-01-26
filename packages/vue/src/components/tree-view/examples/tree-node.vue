<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-vue-next'
import styles from 'styles/tree-view.module.css'

interface Node {
  id: string
  name: string
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
    <TreeView.NodeContext v-slot="nodeState">
      <template v-if="node.children">
        <TreeView.Branch :class="styles.Branch">
          <TreeView.BranchControl :class="styles.BranchControl">
            <TreeView.BranchIndicator :class="styles.BranchIndicator">
              <ChevronRight />
            </TreeView.BranchIndicator>
            <TreeView.BranchText :class="styles.BranchText">
              <FolderOpen v-if="nodeState.expanded" />
              <Folder v-else />
              {{ node.name }}
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent :class="styles.BranchContent">
            <TreeView.BranchIndentGuide :class="styles.BranchIndentGuide" />
            <TreeNode
              v-for="(child, index) in node.children"
              :key="child.id"
              :node="child"
              :indexPath="[...indexPath, index]"
            />
          </TreeView.BranchContent>
        </TreeView.Branch>
      </template>
      <template v-else>
        <TreeView.Item :class="styles.Item">
          <TreeView.ItemText :class="styles.ItemText">
            <File />
            {{ node.name }}
          </TreeView.ItemText>
        </TreeView.Item>
      </template>
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
</template>
