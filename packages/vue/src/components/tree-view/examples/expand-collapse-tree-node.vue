<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-vue-next'
import styles from 'styles/tree-view.module.css'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

interface Props {
  node: TreeNode
  indexPath: number[]
}

defineProps<Props>()
</script>

<template>
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.NodeContext v-slot="nodeState">
      <TreeView.NodeGroup v-if="node.children" :class="styles.NodeGroup">
        <TreeView.Node :class="styles.Node">
          <TreeView.Cell :class="styles.Cell">
            <TreeView.NodeExpandTrigger :class="styles.NodeExpandTrigger">
              <TreeView.NodeIndicator type="expanded" :class="styles.NodeIndicator">
                <ChevronRight />
              </TreeView.NodeIndicator>
            </TreeView.NodeExpandTrigger>
            <TreeView.NodeText :class="styles.NodeText">
              <FolderOpen v-if="nodeState.expanded" />
              <Folder v-else />
              {{ node.name }}
            </TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
        <TreeView.NodeGroupContent :class="styles.NodeGroupContent">
          <TreeView.IndentGuide :class="styles.IndentGuide" />
          <ExpandCollapseTreeNode
            v-for="(child, index) in node.children"
            :key="child.id"
            :node="child"
            :index-path="[...indexPath, index]"
          />
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
      <TreeView.Node v-else :class="styles.Node">
        <TreeView.Cell :class="styles.Cell">
          <TreeView.NodeText :class="styles.NodeText">
            <File />
            {{ node.name }}
          </TreeView.NodeText>
        </TreeView.Cell>
      </TreeView.Node>
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
</template>

<script lang="ts">
import ExpandCollapseTreeNode from './expand-collapse-tree-node.vue'

export default { name: 'ExpandCollapseTreeNode' }
</script>
