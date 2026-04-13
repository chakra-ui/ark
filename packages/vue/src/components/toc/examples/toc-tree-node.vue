<script setup lang="ts">
import { useTocContext } from '@ark-ui/vue/toc'
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight } from 'lucide-vue-next'
import styles from 'styles/toc.module.css'
import treeStyles from 'styles/tree-view.module.css'

export interface TocNode {
  id: string
  name: string
  depth: number
  children?: TocNode[]
}

withDefaults(
  defineProps<{
    node: TocNode
    indexPath: number[]
  }>(),
  { indexPath: () => [] },
)

const toc = useTocContext()
</script>

<template>
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.Branch v-if="node.children?.length" :class="treeStyles.Branch">
      <TreeView.BranchControl :class="treeStyles.BranchControl">
        <TreeView.BranchIndicator :class="treeStyles.BranchIndicator">
          <ChevronRight />
        </TreeView.BranchIndicator>
        <TreeView.BranchText :class="treeStyles.BranchText">
          <a :class="styles.TreeLink" v-bind="toc.getLinkProps({ item: { value: node.id, depth: node.depth } })">
            {{ node.name }}
          </a>
        </TreeView.BranchText>
      </TreeView.BranchControl>
      <TreeView.BranchContent :class="treeStyles.BranchContent">
        <TreeView.BranchIndentGuide :class="treeStyles.BranchIndentGuide" />
        <TocTreeNode
          v-for="(child, idx) in node.children"
          :key="child.id"
          :node="child"
          :index-path="[...indexPath, idx]"
        />
      </TreeView.BranchContent>
    </TreeView.Branch>

    <TreeView.Item v-else :class="treeStyles.Item">
      <TreeView.ItemText :class="treeStyles.ItemText">
        <a :class="styles.TreeLink" v-bind="toc.getLinkProps({ item: { value: node.id, depth: node.depth } })">
          {{ node.name }}
        </a>
      </TreeView.ItemText>
    </TreeView.Item>
  </TreeView.NodeProvider>
</template>
