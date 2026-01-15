<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-vue-next'
import menuStyles from 'styles/menu.module.css'
import styles from 'styles/tree-view.module.css'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

interface Props {
  node: TreeNode
  indexPath: number[]
  triggerId: string
}

defineProps<Props>()
</script>

<template>
  <TreeView.NodeProvider :node="node" :indexPath="indexPath">
    <TreeView.NodeContext v-slot="nodeState">
      <template v-if="node.children">
        <TreeView.Branch :class="styles.Branch">
          <Menu.Root :ids="{ contextTrigger: triggerId }">
            <TreeView.BranchControl :class="styles.BranchControl" asChild>
              <Menu.ContextTrigger>
                <TreeView.BranchIndicator :class="styles.BranchIndicator">
                  <ChevronRight />
                </TreeView.BranchIndicator>
                <TreeView.BranchText :class="styles.BranchText">
                  <FolderOpen v-if="nodeState.expanded" />
                  <Folder v-else />
                  {{ node.name }}
                </TreeView.BranchText>
              </Menu.ContextTrigger>
            </TreeView.BranchControl>
            <Teleport to="body">
              <Menu.Positioner>
                <Menu.Content :class="menuStyles.Content">
                  <Menu.Item :class="menuStyles.Item" value="rename">Rename</Menu.Item>
                  <Menu.Item :class="menuStyles.Item" value="delete">Delete</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Teleport>
          </Menu.Root>
          <TreeView.BranchContent :class="styles.BranchContent">
            <TreeView.BranchIndentGuide :class="styles.BranchIndentGuide" />
            <ContextMenuTreeNode
              v-for="(child, index) in node.children"
              :key="child.id"
              :node="child"
              :indexPath="[...indexPath, index]"
              :triggerId="triggerId"
            />
          </TreeView.BranchContent>
        </TreeView.Branch>
      </template>
      <template v-else>
        <Menu.Root :ids="{ contextTrigger: triggerId }">
          <TreeView.Item :class="styles.Item" asChild>
            <Menu.ContextTrigger>
              <File />
              <TreeView.ItemText :class="styles.ItemText">{{ node.name }}</TreeView.ItemText>
            </Menu.ContextTrigger>
          </TreeView.Item>
          <Teleport to="body">
            <Menu.Positioner>
              <Menu.Content :class="menuStyles.Content">
                <Menu.Item :class="menuStyles.Item" value="rename">Rename</Menu.Item>
                <Menu.Item :class="menuStyles.Item" value="delete">Delete</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Teleport>
        </Menu.Root>
      </template>
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
</template>

<script lang="ts">
import { Teleport } from 'vue'
import ContextMenuTreeNode from './context-menu-tree-node.vue'

export default { name: 'ContextMenuTreeNode' }
</script>
