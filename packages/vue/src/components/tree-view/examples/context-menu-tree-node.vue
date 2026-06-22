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
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.NodeContext v-slot="nodeState">
      <TreeView.NodeGroup v-if="node.children" :class="styles.NodeGroup">
        <TreeView.Node :class="styles.Node">
          <Menu.Root :ids="{ contextTrigger: triggerId }">
            <TreeView.Cell :class="styles.Cell" asChild>
              <Menu.ContextTrigger>
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
              </Menu.ContextTrigger>
            </TreeView.Cell>
            <Teleport to="body">
              <Menu.Positioner>
                <Menu.Content :class="menuStyles.Content">
                  <Menu.Item :class="menuStyles.Item" value="rename">Rename</Menu.Item>
                  <Menu.Item :class="menuStyles.Item" value="delete">Delete</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Teleport>
          </Menu.Root>
        </TreeView.Node>
        <TreeView.NodeGroupContent :class="styles.NodeGroupContent">
          <TreeView.IndentGuide :class="styles.IndentGuide" />
          <ContextMenuTreeNode
            v-for="(child, index) in node.children"
            :key="child.id"
            :node="child"
            :index-path="[...indexPath, index]"
            :triggerId="triggerId"
          />
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
      <TreeView.Node v-else :class="styles.Node">
        <Menu.Root :ids="{ contextTrigger: triggerId }">
          <TreeView.Cell :class="styles.Cell" asChild>
            <Menu.ContextTrigger>
              <File />
              <TreeView.NodeText :class="styles.NodeText">{{ node.name }}</TreeView.NodeText>
            </Menu.ContextTrigger>
          </TreeView.Cell>
          <Teleport to="body">
            <Menu.Positioner>
              <Menu.Content :class="menuStyles.Content">
                <Menu.Item :class="menuStyles.Item" value="rename">Rename</Menu.Item>
                <Menu.Item :class="menuStyles.Item" value="delete">Delete</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Teleport>
        </Menu.Root>
      </TreeView.Node>
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
</template>

<script lang="ts">
import { Teleport } from 'vue'
import ContextMenuTreeNode from './context-menu-tree-node.vue'

export default { name: 'ContextMenuTreeNode' }
</script>
